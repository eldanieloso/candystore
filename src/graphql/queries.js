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

export { GET_CLIENTS, GET_CLIENT, GET_EMPLOYEES, GET_EMPLOYEE, GET_PROVIDERS }
