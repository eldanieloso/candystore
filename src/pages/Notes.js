import React from 'react'
import { Link } from 'react-router-dom'

class Notes extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Notas'
    document.getElementById('module__action').innerHTML = 'Listado de notas'
  }
  render () {
    return (
      <React.Fragment>
        <Link to='/notes/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        Aqui van las notas
      </React.Fragment>
    )
  }
}

export default Notes
