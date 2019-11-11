import React from 'react'

class CreateEmployeeType extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Tipos de empleado'
    document.getElementById('module__action').innerHTML =
      'Crear tipo de empleado'
  }
  render () {
    return <h1>Crear tipo de empleado</h1>
  }
}

export default CreateEmployeeType
