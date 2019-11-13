import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_NOTES } from '../graphql/queries'

class Notes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      notes: []
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Notas'
    document.getElementById('module__action').innerHTML = 'Listado de notas'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_NOTES })
      let notes = data.data.data.notes
      this.setState({ loading: false, notes })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error...'
    return (
      <React.Fragment>
        <Link to='/notes/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.notes.map(note => {
            return (
              <Link key={note.id} to={`/notes/${note.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>{note.date}</span>
                      <p className='kt-widget5__desc'>
                        Cliente: {note.client.name}
                        <br />
                        Empleado: {note.employee.name}
                      </p>
                    </div>
                  </div>
                  <div className='kt-widget5__content' />
                </div>
              </Link>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default Notes
