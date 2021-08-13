import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Production from './pages/Production';
import Completed from './pages/ProdCompleted';
import Shipped from './pages/ProdShipped';

function ProductionHome() {
  let { path } = useRouteMatch();

  return (
    <>
      <NavBar />
      <Switch>
        <Route path={path + '/completed/:id'}>
          <Completed />
        </Route>
        <Route path={path + '/completed'}>
          <Completed />
        </Route>
        <Route path={path + '/shipped/:id'}>
          <Shipped />
        </Route>
        <Route path={path + '/shipped'}>
          <Shipped />
        </Route>
        <Route path={path + '/:id'}>
          <Production />
        </Route>
        <Route exact path={path}>
          <Production />
        </Route>
      </Switch>
    </>
  );
}

export default ProductionHome;
