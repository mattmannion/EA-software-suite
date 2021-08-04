import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  UserContext,
  CookieContext,
  DefaultUserProperties,
} from '../context/UserContext';
import Cookies from 'universal-cookie';

// Page components
import Home from './home/Home';
import Users from './users/Users';
import Login from './login/Login';
import ProductionHome from './production/ProductionHome';

// create cookie
const cookies = new Cookies();

// function ApplicationRouter({ getUser, setUser }) {
function ApplicationRouter() {
  const [getUser, setUser] = useState(DefaultUserProperties);
  const UserProvider = { getUser, setUser };

  return (
    <>
      <UserContext.Provider value={UserProvider}>
        <CookieContext.Provider value={cookies}>
          <Router>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route path='/users/:id' component={Users} />
              <Route exact path='/users' component={Users} />
              <Route path='/production' component={ProductionHome} />
              <Route exact path='/' component={Home} />
            </Switch>
          </Router>
        </CookieContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default ApplicationRouter;
