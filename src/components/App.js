import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Clients from '../pages/Clients'
import NotFound from '../pages/NotFound'
import Layout from './Layout'
import Employees from '../pages/Employees'
import Notes from '../pages/Notes'
import Orders from '../pages/Orders'
import Providers from '../pages/Providers'
import Products from '../pages/Products'
import Schedules from '../pages/Schedules'
import EmployeeTypes from '../pages/EmployeeTypes'
import CreateClient from '../pages/CreateClient'
import CreateEmployee from '../pages/CreateEmployee'
import CreateNote from '../pages/CreateNote'
import CreateOrder from '../pages/CreateOrder'
import CreateProvider from '../pages/CreateProvider'
import CreateProduct from '../pages/CreateProduct'
import CreateSchedule from '../pages/CreateSchedule'
import CreateEmployeeType from '../pages/CreateEmployeeType'
import EditClient from '../pages/EditClient'
import EditEmployee from '../pages/EditEmployee'

function App () {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Clients} />
          <Route exact path='/clients' component={Clients} />
          <Route exact path='/clients/create' component={CreateClient} />
          <Route exact path='/clients/:id' component={EditClient} />
          <Route exact path='/employees' component={Employees} />
          <Route exact path='/employees/create' component={CreateEmployee} />
          <Route exact path='/employees/:id' component={EditEmployee} />
          <Route exact path='/notes' component={Notes} />
          <Route exact path='/notes/create' component={CreateNote} />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/orders/create' component={CreateOrder} />
          <Route exact path='/providers' component={Providers} />
          <Route exact path='/providers/create' component={CreateProvider} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/create' component={CreateProduct} />
          <Route exact path='/schedules' component={Schedules} />
          <Route exact path='/schedules/create' component={CreateSchedule} />
          <Route exact path='/employee-types' component={EmployeeTypes} />
          <Route
            exact
            path='/employee-types/create'
            component={CreateEmployeeType}
          />
          <Route path='*' component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
