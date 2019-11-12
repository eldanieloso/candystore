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

export { UPDATE_CLIENT, CREATE_CLIENT }
