import axios from 'axios'

const axiosGraphQL = axios.create({
  baseURL: 'http://localhost:3000/graphql'
})

export default axiosGraphQL
