import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_NOTE } from '../graphql/mutations'

class CreateNote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      note: {
        date: '',
        client: 1,
        employee: 1,
        product: 1,
        quantity: 1
      },
      redirect: false
    }
  }

  handleChange = e => {
    this.setState({
      note: {
        ...this.state.note,
        [e.target.id]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true, error: null })
    try {
      let note = {}
      note.date = this.state.note.date
      note.client = this.state.note.client
      note.employee = this.state.note.employee
      note.products = [
        {
          product: this.state.note.product,
          quantity: parseFloat(this.state.note.quantity)
        }
      ]
      await axiosGraphQL.post('', {
        query: CREATE_NOTE,
        variables: note
      })
      this.setState({ redirect: true })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Notas'
    document.getElementById('module__action').innerHTML = 'Crear nota'
  }
  render () {
    if (this.state.redirect) return <Redirect to='/notes' />
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <form
        onSubmit={this.handleSubmit}
        className='kt-form kt-form--label-right'
      >
        <div className='kt-portlet__body'>
          <div className='form-group row'>
            <label htmlFor='date' className='col-2 col-form-label'>
              Fecha
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.note.date}
                id='date'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='client' className='col-2 col-form-label'>
              Cliente
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.note.client}
                id='client'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='employee' className='col-2 col-form-label'>
              Empleado
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='text'
                value={this.state.note.employee}
                id='employee'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='product' className='col-2 col-form-label'>
              Producto
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.note.product}
                id='product'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='quantity' className='col-2 col-form-label'>
              Cantidad
            </label>
            <div className='col-10'>
              <input
                onChange={this.handleChange}
                className='form-control'
                type='number'
                value={this.state.note.quantity}
                id='quantity'
              />
            </div>
          </div>
        </div>
        <div className='kt-portlet__foot'>
          <div className='kt-form__actions'>
            <div className='row'>
              <div className='col-2' />
              <div className='col-10'>
                <button
                  type='submit'
                  className='btn btn-brand btn-elevate btn-elevate-air'
                >
                  Guardar
                </button>
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

export default CreateNote
