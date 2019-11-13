import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_NOTE } from '../graphql/queries'

class ShowNote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      note: null
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Notas'
    document.getElementById('module__action').innerHTML = 'Mostrar nota'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    const { id } = this.props.match.params
    let data = await axiosGraphQL.post('', { query: GET_NOTE(id) })
    let note = data.data.data.notes[0]
    this.setState({ loading: false, note })
    try {
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form className='kt-form kt-form--label-right'>
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='date' className='col-2 col-form-label'>
              Fecha
            </label>
            <div className='col-10'>
              <input
                className='form-control'
                type='text'
                value={this.state.note.date}
                id='date'
                readOnly
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='client' className='col-2 col-form-label'>
              Cliente
            </label>
            <div className='col-10'>
              <input
                className='form-control'
                type='text'
                value={`${this.state.note.client.name} ${
                  this.state.note.client.lastName
                }`}
                id='client'
                readOnly
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='employee' className='col-2 col-form-label'>
              Empleado
            </label>
            <div className='col-10'>
              <input
                className='form-control'
                type='text'
                value={`${this.state.note.employee.name} ${
                  this.state.note.employee.lastName
                }`}
                id='employee'
                readOnly
              />
            </div>
          </div>
        </div>
        <div className='kt-portlet__foot'>
          <div className='kt-form__actions'>
            <div className='row'>
              <div className='col-2' />
              <div className='col-10'>
                <Link
                  to='/notes'
                  className='btn btn-secondary btn-elevate btn-elevate-air'
                >
                  Regresar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default ShowNote
