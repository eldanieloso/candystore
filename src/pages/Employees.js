import React from 'react'
import { Link } from 'react-router-dom'

class Employees extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Empleados'
    document.getElementById('module__action').innerHTML = 'Listado de empleados'
  }
  render () {
    return (
      <React.Fragment>
        <Link
          to='/employees/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        Aqui van los empleados
      </React.Fragment>
    )
  }
}

export default Employees
