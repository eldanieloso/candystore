import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_ORDER } from '../graphql/mutations'

class CreateOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      order: {
        provider: 1,
        createdAt: '',
        product: 1,
        quantity: 1
      },
      redirect: false
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
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.order.provider}
                id='provider'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='createdAt' className='col-2 col-form-label'>
              Fecha de creación
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.order.createdAt}
                id='createdAt'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='product' className='col-2 col-form-label'>
              Producto
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.order.product}
                id='product'
              />
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
