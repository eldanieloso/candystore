import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_PRODUCT } from '../graphql/mutations'

class CreateProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      product: {
        name: '',
        description: '',
        onStock: 0,
        cost: 0,
        price: 0,
        provider: 1,
        unit: 1
      },
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
      await axiosGraphQL.post('', {
        query: CREATE_PRODUCT,
        variables: product
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Productos'
    document.getElementById('module__action').innerHTML = 'Crear producto'
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
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.product.provider}
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
                value={this.state.product.unit}
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

export default CreateProduct
