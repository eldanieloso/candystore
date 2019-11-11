import React from 'react'

class CreateProvider extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Proveedores'
    document.getElementById('module__action').innerHTML = 'Crear proveedor'
  }
  render () {
    return <h1>Crear proveedor</h1>
  }
}

export default CreateProvider
