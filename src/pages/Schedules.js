import React from 'react'
import { Link } from 'react-router-dom'

class Schedules extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Horarios'
    document.getElementById('module__action').innerHTML = 'Listado de horarios'
  }
  render () {
    return (
      <React.Fragment>
        <Link
          to='/schedules/create'
          className='btn btn-outline-accent btn-pill'
        >
          Agregar
        </Link>
        Aqui van los horarios
      </React.Fragment>
    )
  }
}

export default Schedules
