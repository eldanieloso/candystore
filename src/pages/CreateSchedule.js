import React from 'react'

class CreateSchedule extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Horarios'
    document.getElementById('module__action').innerHTML = 'Crear horario'
  }
  render () {
    return <h1>Crear horario</h1>
  }
}

export default CreateSchedule
