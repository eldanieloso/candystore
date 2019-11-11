import React from 'react'
import { Link } from 'react-router-dom'

class Clients extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Clientes'
    document.getElementById('module__action').innerHTML = 'Listado de clientes'
  }
  render () {
    return (
      <React.Fragment>
        <Link to='/clients/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        Aqui van los clientes
      </React.Fragment>
    )
  }
}

export default Clients
