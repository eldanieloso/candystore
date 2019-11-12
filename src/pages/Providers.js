import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_PROVIDERS } from '../graphql/queries'

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
                      <p className='kt-widget5__desc'>{provider.address}</p>
                      <div className='kt-widget5__info'>
                        <span>{provider.telephone}</span>
                      </div>
                    </div>
                  </div>
                  <div className='kt-widget5__content' />
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
