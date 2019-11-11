import React from 'react'
import { Link } from 'react-router-dom'

class EmployeeTypes extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Tipos de empleado'
    document.getElementById('module__action').innerHTML =
      'Listado de tipos de empleado'
  }
  render () {
    return (
      <React.Fragment>
        <Link
          to='/employee-types/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        Aqui van los tipos de usuario
      </React.Fragment>
    )
  }
}

export default EmployeeTypes
