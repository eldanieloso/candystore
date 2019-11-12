const GET_CLIENTS = `{
    clients{
      id
      name
      lastName
      address
      telephone
      creditAvailable
      creditUsed
    }
}`

const GET_CLIENT = id => `{
  clients(id:${id}){
    id
    name
    lastName
    address
    telephone
    creditAvailable
    creditUsed
  }
}`

const GET_EMPLOYEES = `{
  employees{
    id
    name
    lastName
    address
    typeEmployee{
      job
    }
    status
    salary
  }
}`

const GET_EMPLOYEE = id =>
  `{
    employees(id:${id}){
      id
      name
      lastName
      address
      schedule{
        id
        start
        finish
      }
      typeEmployee{
        id
        job
        description
      }
      startDate
      status
      salary
      endDate
    }
  }`

const GET_PROVIDERS = `{
    providers{
      id
      name
      telephone
      address
    }
  }`

const GET_PROVIDER = id => `{
  providers(id:${id}){
    id
    name
    telephone
    address
  }
}`

const GET_ORDERS = `{
    orders{
      id
      provider{
        name
      }
      createdAt
      arrivedAt
    }
  }`

const GET_ORDER = id => `{
  orders(id: ${id}){
    id
    provider{
      name
    }
    createdAt
  }
}`

const GET_SCHEDULES = `{
  schedules{
    id
    start
    finish
  }
}`

const GET_SCHEDULE = id => `{
  schedules(id:${id}){
    id
    start
    finish
  }
}`

export {
  GET_CLIENTS,
  GET_CLIENT,
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  GET_PROVIDERS,
  GET_ORDERS,
  GET_ORDER,
  GET_PROVIDER,
  GET_SCHEDULES,
  GET_SCHEDULE
}
