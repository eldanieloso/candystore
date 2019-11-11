import React from 'react'

class CreateEmployee extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Empleados'
    document.getElementById('module__action').innerHTML = 'Crear empleado'
  }
  render () {
    return <h1>Crear empleado</h1>
  }
}

export default CreateEmployee
