import React from 'react'

class CreateProduct extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Productos'
    document.getElementById('module__action').innerHTML = 'Crear producto'
  }
  render () {
    return <h1>Crear producto</h1>
  }
}

export default CreateProduct
