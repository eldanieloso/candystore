import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { CREATE_NOTE } from '../graphql/mutations'
import { GET_CLIENTS, GET_EMPLOYEES, GET_PRODUCTS } from '../graphql/queries'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class CreateNote extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null,
      note: {
        date: new Date(),
        client: 1,
        employee: 1,
        product: 1,
        quantity: 1
      },
      clients: [],
      employees: [],
      products: [],
      redirect: false
    }
    this.getClients()
    this.getEmployees()
    this.getProducts()
  }

  getClients = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_CLIENTS })
      let clients = data.data.data.clients
      let newNote = { ...this.state.note }
      newNote.client = clients[0].id
      this.setState({ clients, note: newNote })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  getEmployees = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_EMPLOYEES })
      let employees = data.data.data.employees
      let newNote = { ...this.state.note }
      newNote.employee = employees[0].id
      this.setState({ employees, note: newNote })
    } catch (error) {
      this.setState({ error: true })
    }
  }

  getProducts = async () => {
    try {
      let data = await axiosGraphQL.post('', { query: GET_PRODUCTS })
      let products = data.data.data.products
      let newNote = { ...this.state.note }
      newNote.product = products[0].id
      this.setState({ products, note: newNote })
    } catch (error) {
      this.setState({ error: true })
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

  setDate (date) {
    let newNote = { ...this.state.note }
    newNote.date = date
    this.setState({ note: newNote })
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
              <DatePicker
                dateFormat='yyyy/MM/dd'
                onChange={date => this.setDate(date)}
                className='form-control'
                id='date'
                selected={this.state.note.date}
                withPortal
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='client' className='col-2 col-form-label'>
              Cliente
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='client'
              >
                {this.state.clients.map(client => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='employee' className='col-2 col-form-label'>
              Empleado
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='employee'
              >
                {this.state.employees.map(employee => {
                  return (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='product' className='col-2 col-form-label'>
              Producto
            </label>
            <div className='col-10'>
              <select
                onChange={this.handleChange}
                className='form-control'
                id='product'
              >
                {this.state.products.map(product => {
                  return (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  )
                })}
              </select>
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
