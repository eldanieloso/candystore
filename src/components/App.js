import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Clients from '../pages/Clients'
import NotFound from '../pages/NotFound'
import Layout from './Layout'

function App () {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Clients} />
          <Route exact path='/clients' component={Clients} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
