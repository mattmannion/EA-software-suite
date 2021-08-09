import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Production from './components/Production';
import Completed from './pages/Prod_Completed';
import Shipped from './pages/Prod_Shipped';

function ProductionHome() {
  let { path } = useRouteMatch();

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={path} component={Production} />
        <Route path={path + '/completed'} component={Completed} />
        <Route path={path + '/shipped'} component={Shipped} />
      </Switch>
    </>
  );
}

export default ProductionHome;
