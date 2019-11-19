import React from 'react'
import { Link } from 'react-router-dom'
import axiosGraphQL from '../graphql/client'
import { GET_PRODUCTS } from '../graphql/queries'

class Products extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      products: []
    }
  }

  componentDidMount () {
    document.getElementById('section__name').innerHTML = 'Productos'
    document.getElementById('module__action').innerHTML = 'Listado de productos'
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null })
    try {
      let data = await axiosGraphQL.post('', { query: GET_PRODUCTS })
      let products = data.data.data.products
      this.setState({ loading: false, products })
    } catch (error) {
      this.setState({ loading: false, error: true })
    }
  }

  render () {
    if (this.state.loading === true) return 'Loading...'
    if (this.state.error === true) return 'Error'
    return (
      <React.Fragment>
        <Link to='/products/create' className='btn btn-outline-accent btn-pill'>
          Agregar
        </Link>
        <div className='kt-widget5'>
          {this.state.products.map(product => {
            return (
              <Link key={product.id} to={`/products/${product.id}`}>
                <div className='kt-widget5__item'>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__section'>
                      <span className='kt-widget5__title'>{product.name}</span>
                      <p className='kt-widget5__desc'>{product.description}</p>
                      <div className='kt-widget5__info'>
                        <span>Proveedor: {product.provider.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className='kt-widget5__content'>
                    <div className='kt-widget5__stats'>
                      <span className='kt-widget5__number'>
                        {product.onStock}
                      </span>
                      <span className='kt-widget5__sales'>en stock</span>
                    </div>
                    <div className='kt-widget5__stats'>
                      <span className='kt-widget5__number'>
                        ${product.price[product.price.length - 1].value || 0}
                      </span>
                      <span className='kt-widget5__votes'>precio</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default Products
