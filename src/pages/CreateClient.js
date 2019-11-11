import React from 'react'

class CreateClient extends React.Component {
  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Clientes'
    document.getElementById('module__action').innerHTML = 'Crear cliente'
  }
  render () {
    return <h1>Crear cliente</h1>
  }
}

export default CreateClient
