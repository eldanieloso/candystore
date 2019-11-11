import React from 'react'
import { Link } from 'react-router-dom'

class Orders extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Órdenes'
    document.getElementById('module__action').innerHTML = 'Listado de órdenes'
  }
  render () {
    return (
      <React.Fragment>
        <Link to='/orders/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        Aqui van las ordenes
      </React.Fragment>
    )
  }
}

export default Orders
