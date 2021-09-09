import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  UserContext,
  CookieContext,
  DefaultUserProperties,
} from '../context/UserContext';
import Cookies from 'universal-cookie';

// Page components
import Login from './login/Login';
import Home from './home/Home';
const Users = lazy(() => import('./users/Users'));
const ProductionHome = lazy(() => import('./production/ProductionHome'));

// create cookie
const cookies = new Cookies();

export default function ApplicationRouter() {
  const [getUser, setUser] = useState(DefaultUserProperties);
  const UserProvider = { getUser, setUser };

  return (
    <>
      <UserContext.Provider value={UserProvider}>
        <CookieContext.Provider value={cookies}>
          <Router>
            <Suspense fallback={<strong>Loading...</strong>}>
              <Switch>
                <Route exact path='/login' component={Login} />
                <Route path='/users/:id' component={Users} />
                <Route exact path='/users' component={Users} />
                <Route path='/production' component={ProductionHome} />
                <Route exact path='/' component={Home} />
              </Switch>
            </Suspense>
          </Router>
        </CookieContext.Provider>
      </UserContext.Provider>
    </>
  );
}
