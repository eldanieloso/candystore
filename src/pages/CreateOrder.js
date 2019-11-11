import React from 'react'

class CreateOrder extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Órdenes'
    document.getElementById('module__action').innerHTML = 'Crear órden'
  }
  render () {
    return <h1>Crear orden</h1>
  }
}

export default CreateOrder
