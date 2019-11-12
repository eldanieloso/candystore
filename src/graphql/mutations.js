const UPDATE_CLIENT = `
    mutation updateClient($id:ID!, $name:String!, $lastName:String!, $address:String!, $telephone:String!, $creditAvailable:Float!, $creditUsed:Float!) {
        updateClient(id:$id, data:{ 
            name: $name
            lastName: $lastName
            address: $address
            telephone: $telephone
            creditAvailable: $creditAvailable
            creditUsed: $creditUsed
        }){
            id
        }
    }
`

const CREATE_CLIENT = `
    mutation createClient($name:String!, $lastName:String!, $address:String!, $telephone:String!, $creditAvailable:Float!, $creditUsed:Float!) {
        createClient(data:{ 
            name: $name
            lastName: $lastName
            address: $address
            telephone: $telephone
            creditAvailable: $creditAvailable
            creditUsed: $creditUsed
        }){
            id
        }
    }
`

const UPDATE_EMPLOYEE = `
    mutation updateEmployee($id:ID!, $name:String!, $lastName:String!, $address:String!, $typeEmployee:ID!, $schedule:ID!, $startDate:String!, $status:String!, $salary:Float!, $endDate:String!) {
        updateEmployee(id:$id, data:{ 
            name: $name
            lastName: $lastName
            address: $address
            schedule: $schedule
            typeEmployee: $typeEmployee
            startDate: $startDate
            status: $status
            salary: $salary
            endDate: $endDate
        }){
            id
        }
    }
`

const CREATE_EMPLOYEE = `
    mutation createEmployee($name:String!, $lastName:String!, $address:String!, $typeEmployee:ID!, $schedule:ID!, $startDate:String!, $status:String!, $salary:Float!, $endDate:String) {
        createEmployee(data:{ 
            name: $name
            lastName: $lastName
            address: $address
            schedule: $schedule
            typeEmployee: $typeEmployee
            startDate: $startDate
            status: $status
            salary: $salary
            endDate: $endDate
        }){
            id
        }
    }
`

const CREATE_ORDER = `
    mutation createOrder($provider:ID!, $createdAt:String!, $products:[Contain!]!) {
        createOrder(data:{ 
            provider: $provider
            createdAt: $createdAt
            products: $products
        }){
            id
        }
    }
`

const CREATE_PROVIDER = `
    mutation createProvider($name:String!, $telephone:String!, $address:String!) {
        createProvider(data:{ 
            name: $name
            telephone: $telephone
            address: $address
        }){
            id
        }
    }
`

const UPDATE_PROVIDER = `
    mutation updateProvider($id:ID!, $name:String!, $telephone:String!, $address:String!) {
        updateProvider(id: $id, data:{ 
            name: $name
            telephone: $telephone
            address: $address
        }){
            id
        }
    }
`

const UPDATE_SCHEDULE = `
    mutation updateSchedule($id:ID!, $finish:String!, $start:String!) {
        updateSchedule(id: $id, data:{ 
            finish: $finish
            start: $start
        }){
            id
        }
    }
`

const CREATE_SCHEDULE = `
    mutation createSchedule($finish:String!, $start:String!) {
        createSchedule(data:{ 
            finish: $finish
            start: $start
        }){
            id
        }
    }
`

const CREATE_EMPLOYEE_TYPE = `
    mutation createTypeEmployee($job:String!, $description:String!) {
        createTypeEmployee(data:{ 
            job: $job
            description: $description
        }){
            id
        }
    }
`

const UPDATE_EMPLOYEE_TYPE = `
    mutation updateTypeEmployee($id:ID!, $job:String!, $description:String!) {
        updateTypeEmployee(id: $id, data:{ 
            job: $job
            description: $description
        }){
            id
        }
    }
`

export {
  UPDATE_CLIENT,
  CREATE_CLIENT,
  UPDATE_EMPLOYEE,
  CREATE_EMPLOYEE,
  CREATE_ORDER,
  UPDATE_PROVIDER,
  CREATE_PROVIDER,
  UPDATE_SCHEDULE,
  CREATE_SCHEDULE,
  CREATE_EMPLOYEE_TYPE,
  UPDATE_EMPLOYEE_TYPE
}
