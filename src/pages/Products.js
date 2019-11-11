import React from 'react'
import { Link } from 'react-router-dom'

class Products extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Productos'
    document.getElementById('module__action').innerHTML = 'Listado de productos'
  }
  render () {
    return (
      <React.Fragment>
        <Link to='/products/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        Aqui van los productos
      </React.Fragment>
    )
  }
}

export default Products
