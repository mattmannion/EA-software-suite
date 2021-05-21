import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Update from './Update';

render(
  <>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/:id/update' component={Update} />
      </Switch>
    </Router>
  </>,
  document.getElementById('root')
);
