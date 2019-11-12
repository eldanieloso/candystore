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

export {
  UPDATE_CLIENT,
  CREATE_CLIENT,
  UPDATE_EMPLOYEE,
  CREATE_EMPLOYEE,
  CREATE_ORDER
}
