import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_PRODUCT, GET_PROVIDERS, GET_UNITS } from '../graphql/queries'
import { UPDATE_PRODUCT } from '../graphql/mutations'

class EditProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      product: null,
      redirect: false,
      providers: [],
      units: [],
    }
    this.getProviders()
    this.getUnits()
  }

  getProviders = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_PROVIDERS })
      let providers = data.data.data.providers
      this.setState({ providers })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  getUnits = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_UNITS })
      let units = data.data.data.units
      this.setState({ units })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  handleChange = e => {
    this.setState({
      product: {
        ...this.state.product,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      let product = { ...this.state.product }
      product.onStock = parseFloat(product.onStock)
      product.cost = parseFloat(product.cost)
      product.price = parseFloat(product.price)
      await axiosGraphQL.post('', {
        query: UPDATE_PRODUCT,
        variables: product
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Productos'
    document.getElementById('module__action').innerHTML = 'Editar producto'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    const { id } = this.props.match.params
    try {
      let data = await axiosGraphQL.post('', { query: GET_PRODUCT(id) })
      let product = data.data.data.products[0]
      product.cost = product.cost[product.cost.length - 1].value
      product.price = product.price[product.price.length - 1].value
      product.provider = product.provider.id
      product.unit = product.unit.id
      this.setState({ loading: false, product })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  render () {
    if (this.state.redirect) return <Redirect to='/products' />
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form
        onSubmit={this.handleSubmit}
        className='kt-form kt-form--label-right'
      >
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='name' className='col-2 col-form-label'>
              Nombre
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.product.name}
                id='name'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='description' className='col-2 col-form-label'>
              Descripción
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.product.description}
                id='description'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='onStock' className='col-2 col-form-label'>
              En stock
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.product.onStock}
                id='onStock'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='cost' className='col-2 col-form-label'>
              Costo
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.product.cost}
                id='cost'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='price' className='col-2 col-form-label'>
              Precio
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.product.price}
                id='price'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='provider' className='col-2 col-form-label'>
              Proveedor
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='provider'
                defaultValue={this.state.product.provider}
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
            <label htmlFor='unit' className='col-2 col-form-label'>
              Unidad
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='unit'
                defaultValue={this.state.product.unit}
              >
                {this.state.units.map(unit => {
                  return (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  )
                })}
              </select>
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
                  to='/products'
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

export default EditProduct
