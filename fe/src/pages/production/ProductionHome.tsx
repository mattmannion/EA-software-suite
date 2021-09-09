import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Production from './pages/Production';
import Completed from './pages/ProdCompleted';
import Shipped from './pages/ProdShipped';
import { OrderListIF } from '../../../types/pages/production/pages/production';

export interface setListIF {
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>;
}

export default function ApplicationRouter() {
  let { path } = useRouteMatch();

  return (
    <>
      <NavBar />
      <Switch>
        <Route path={path + '/completed/:o_id&:od_id'}>
          <Completed />
        </Route>
        <Route path={path + '/completed'}>
          <Completed />
        </Route>
        <Route path={path + '/shipped/:o_id&:od_id'}>
          <Shipped />
        </Route>
        <Route path={path + '/shipped'}>
          <Shipped />
        </Route>
        <Route path={path + '/:o_id&:od_id'}>
          <Production />
        </Route>
        <Route exact path={path}>
          <Production />
        </Route>
      </Switch>
    </>
  );
}
