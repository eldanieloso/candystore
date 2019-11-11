import React from 'react'

class CreateNote extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Notas'
    document.getElementById('module__action').innerHTML = 'Crear nota'
  }
  render () {
    return <h1>Crear nota</h1>
  }
}

export default CreateNote
