import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_PROVIDER } from '../graphql/mutations'

class CreateProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      provider: {
        name: '',
        telephone: '',
        address: ''
      },
      redirect: false
    }
  }

  handleChange = e => {
    this.setState({
      provider: {
        ...this.state.provider,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      await axiosGraphQL.post('', {
        query: CREATE_PROVIDER,
        variables: this.state.provider
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Proveedores'
    document.getElementById('module__action').innerHTML = 'Crear proveedor'
  }

  render () {
    if (this.state.redirect) return <Redirect to='/providers' />
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
                value={this.state.provider.name}
                id='name'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='telephone' className='col-2 col-form-label'>
              Teléfono
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.provider.telephone}
                id='telephone'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='address' className='col-2 col-form-label'>
              Dirección
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.provider.address}
                id='address'
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
                  to='/providers'
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

export default CreateProvider
