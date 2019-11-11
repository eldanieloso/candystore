import React from 'react'
import { Link } from 'react-router-dom'

class Providers extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Proveedores'
    document.getElementById('module__action').innerHTML =
      'Listado de proveedores'
  }
  render () {
    return (
      <React.Fragment>
        <Link
          to='/providers/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        Aqui van los proveedores
      </React.Fragment>
    )
  }
}

export default Providers
