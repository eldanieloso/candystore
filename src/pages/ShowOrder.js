import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_ORDER } from '../graphql/queries'
import timestampToDate from 'timestamp-to-date'

class ShowOrder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      order: null
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Órdenes'
    document.getElementById('module__action').innerHTML = 'Mostrar órden'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    const { id } = this.props.match.params
    try {
      let data = await axiosGraphQL.post('', { query: GET_ORDER(id) })
      let order = data.data.data.orders[0]
      this.setState({ loading: false, order })
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
            <label htmlFor='name' className='col-2 col-form-label'>
              Proveedor
            </label>
            <div className='col-10'>
              <input
                className='form-control'
                type='text'
                value={this.state.order.provider.name}
                id='name'
                readOnly
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='lastName' className='col-2 col-form-label'>
              Fecha de creación
            </label>
            <div className='col-10'>
              <input
                className='form-control'
                type='text'
                value={timestampToDate(
                  this.state.order.createdAt,
                  'yyyy/MM/dd'
                )}
                id='lastName'
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
                  to='/orders'
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

export default ShowOrder
