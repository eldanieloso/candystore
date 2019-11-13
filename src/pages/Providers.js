import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_PROVIDERS, GET_PROVIDER } from '../graphql/queries'
import { DELETE_PROVIDER } from '../graphql/mutations'

class Providers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      providers: []
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Proveedores'
    document.getElementById('module__action').innerHTML =
      'Listado de proveedores'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_PROVIDERS })
      let providers = data.data.data.providers
      this.setState({ loading: false, providers })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  deleteProvider = async (event, id) => {
    event.preventDefault()
    if (this.state.providers.length === 1) {
      return alert('Debe haber al menos un proveedor')
    }
    let newId = prompt(
      'Ingresa el nuevo id del proveedor que tendrán los productos del proveedor que estás eliminando'
    )
    let isValidId = await this.validateId(newId)
    if (id === newId || !isValidId) { return alert('El ID que ingresaste no es válido') }

    try {
      let data = await axiosGraphQL.post('', {
        query: DELETE_PROVIDER,
        variables: { id, newId }
      })
      if (data.data.errors) alert('Verifica la información')
      this.fetchData()
    } catch (error) {
      alert('Verifica la información')
      this.setState({ loading: false, error })
    }
  }

  validateId = async id => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_PROVIDER(id) })
      if (data.data.errors) return false
      return true
    } catch (error) {
      return false
    }
  }

  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <React.Fragment>
        <Link
          to='/providers/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.providers.map(provider => {
            return (
              <Link key={provider.id} to={`/providers/${provider.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>{provider.name}</span>
                      <p className='kt-widget5__desc'>
                        ID: {provider.id}
                        <br />
                        {provider.address}
                      </p>
                      <div className='kt-widget5__info'>
                        <span>{provider.telephone}</span>
                      </div>
                    </div>
                  </div>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__stats'>
                      <button
                        type='button'
                        className='btn btn-outline-danger btn-elevate btn-pill'
                        onClick={e => this.deleteProvider(e, provider.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default Providers
