import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_PRODUCT } from '../graphql/queries'
import { UPDATE_PRODUCT } from '../graphql/mutations'

class EditProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      product: null,
      redirect: false
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
      product.provider = product.provider.id
      product.unit = product.unit.id
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
                value={this.state.product.cost.value}
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
                value={this.state.product.price.value}
                id='price'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='provider' className='col-2 col-form-label'>
              Proveedor
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.product.provider.id}
                id='provider'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='unit' className='col-2 col-form-label'>
              Unidad
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.product.unit.id}
                id='unit'
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
