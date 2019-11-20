import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_ORDER } from '../graphql/mutations'
import { GET_PROVIDERS, GET_PRODUCTS } from '../graphql/queries'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class CreateOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      order: {
        provider: 1,
        createdAt: new Date(),
        product: 1,
        quantity: 1
      },
      providers: [],
      products: [],
      redirect: false
    }
    this.getProviders()
    this.getProducts()
  }

  getProviders = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_PROVIDERS })
      let providers = data.data.data.providers
      let newOrder = { ...this.state.order }
      newOrder.provider = providers[0].id
      this.setState({ providers, order: newOrder })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  getProducts = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_PRODUCTS })
      let products = data.data.data.products
      let newOrder = { ...this.state.order }
      newOrder.product = products[0].id
      this.setState({ products, order: newOrder })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  handleChange = e => {
    this.setState({
      order: {
        ...this.state.order,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      let order = {}
      order.provider = this.state.order.provider
      order.createdAt = this.state.order.createdAt
      order.products = [
        {
          product: this.state.order.product,
          quantity: parseFloat(this.state.order.quantity)
        }
      ]
      await axiosGraphQL.post('', {
        query: CREATE_ORDER,
        variables: order
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Órdenes'
    document.getElementById('module__action').innerHTML = 'Crear órden'
  }

  setCreatedAt (date) {
    let newOrder = { ...this.state.order }
    newOrder.createdAt = date
    this.setState({ order: newOrder })
  }

  render () {
    if (this.state.redirect) return <Redirect to='/orders' />
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form
        onSubmit={this.handleSubmit}
        className='kt-form kt-form--label-right'
      >
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='provider' className='col-2 col-form-label'>
              Proveedor
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='provider'
                defaultValue={this.state.order.provider}
              >
                {this.state.providers.map(provider => {
                  return (
                    <option key={provider.id} value={provider.id}>
                      {provider.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='createdAt' className='col-2 col-form-label'>
              Fecha de creación
            </label>
            <div className='col-10'>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                onChange={date => this.setCreatedAt(date)}
                className='form-control'
                id='createdAt'
                selected={this.state.order.createdAt}
                withPortal
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='product' className='col-2 col-form-label'>
              Producto
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='product'
                defaultValue={this.state.order.product}
              >
                {this.state.products.map(product => {
                  return (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='quantity' className='col-2 col-form-label'>
              Cantidad de producto
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.order.quantity}
                id='quantity'
              />
            </div>
          </div>
        </div>
        <div className='kt-portlet__foot'>
          <div className='kt-form__actions'>
            <div className='row'>
              <div className='col-2' />
              <div className='col-10'>
                <button
                  type='submit'
                  className='btn btn-brand btn-elevate btn-elevate-air'
                >
                  Guardar
                </button>
                <Link
                  to='/orders'
                  className='btn btn-secondary btn-elevate btn-elevate-air'
                >
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default CreateOrder
