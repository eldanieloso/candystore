import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_CLIENTS } from '../graphql/queries'

class Clients extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      clients: []
    }
  }
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Clientes'
    document.getElementById('module__action').innerHTML = 'Listado de clientes'
    this.fetchData()
  }
  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_CLIENTS })
      let clients = data.data.data.clients
      this.setState({ loading: false, clients })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }
  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <React.Fragment>
        <Link to='/clients/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.clients.map(client => {
            return (
              <Link key={client.id} to={`/clients/${client.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>
                        {`${client.name} ${client.lastName}`}
                      </span>
                      <p className='kt-widget5__desc'>{client.address}</p>
                      <div className='kt-widget5__info'>
                        <span>{client.telephone}</span>
                      </div>
                    </div>
                  </div>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__stats'>
                      <span className='kt-widget5__number'>
                        {client.creditAvailable}
                      </span>
                      <span className='kt-widget5__sales'>
                        crédito disponible
                      </span>
                    </div>
                    <div className='kt-widget5__stats'>
                      <span className='kt-widget5__number'>
                        {client.creditUsed}
                      </span>
                      <span className='kt-widget5__votes'>crédito usado</span>
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

export default Clients
