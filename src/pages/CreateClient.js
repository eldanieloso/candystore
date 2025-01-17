import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_CLIENT } from '../graphql/mutations'

class CreateClient extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      client: {
        name: '',
        lastName: '',
        address: '',
        telephone: '',
        creditAvailable: '',
        creditUsed: ''
      },
      redirect: false
    }
  }

  handleChange = e => {
    this.setState({
      client: {
        ...this.state.client,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      let client = { ...this.state.client }
      client.creditAvailable = parseFloat(client.creditAvailable)
      client.creditUsed = parseFloat(client.creditUsed)
      await axiosGraphQL.post('', {
        query: CREATE_CLIENT,
        variables: client
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Clientes'
    document.getElementById('module__action').innerHTML = 'Crear cliente'
  }

  render () {
    if (this.state.redirect) return <Redirect to='/clients' />
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
                value={this.state.client.name}
                id='name'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='lastName' className='col-2 col-form-label'>
              Apellido
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.client.lastName}
                id='lastName'
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
                value={this.state.client.address}
                id='address'
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
                value={this.state.client.telephone}
                id='telephone'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='creditAvailable' className='col-2 col-form-label'>
              Crédito Disponible
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.client.creditAvailable}
                id='creditAvailable'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='creditUsed' className='col-2 col-form-label'>
              Crédito Usado
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.client.creditUsed}
                id='creditUsed'
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
                  to='/clients'
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

export default CreateClient
