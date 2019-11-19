import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_ORDERS } from '../graphql/queries'
import timestampToDate from 'timestamp-to-date'

class Orders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      orders: []
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Órdenes'
    document.getElementById('module__action').innerHTML = 'Listado de órdenes'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_ORDERS })
      let orders = data.data.data.orders
      this.setState({ loading: false, orders })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <React.Fragment>
        <Link to='/orders/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.orders.map(order => {
            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>
                        {order.provider.name}
                      </span>
                      <p className='kt-widget5__desc'>
                        Creado el{' '}
                        {timestampToDate(order.createdAt, 'yyyy/MM/dd')}
                      </p>
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

export default Orders
