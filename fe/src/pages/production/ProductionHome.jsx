import { useContext, useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Production from './pages/Production';
import Completed from './pages/ProdCompleted';
import Shipped from './pages/ProdShipped';
import {
  UserCheck,
  UserContext,
  CookieContext,
} from '../../context/UserContext';
import { ProductionFetch } from './logic/Production';
import ProdToolbar from './components/ProdToolbar';

function ProductionHome() {
  let { path } = useRouteMatch();

  // all the hooks
  const history = useHistory();
  const { pathname } = useLocation();
  const { setUser } = useContext(UserContext);
  const cookies = useContext(CookieContext);
  const [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  // starts as null in the event that the fetched
  // data is null or the array is null
  const [getList, setList] = useState([]);

  // checks if there is a user logged before loading data
  useEffect(() => {
    if (getFetchGate) ProductionFetch('/production', setList);
  }, [getFetchGate, pathname]);

  return (
    <>
      <NavBar />
      <ProdToolbar />
      <Switch>
        <Route path={path + '/completed/:id'}>
          <Completed getList={getList} />
        </Route>
        <Route path={path + '/completed'}>
          <Completed getList={getList} />
        </Route>
        <Route path={path + '/shipped/:id'}>
          <Shipped getList={getList} />
        </Route>
        <Route path={path + '/shipped'}>
          <Shipped getList={getList} />
        </Route>
        <Route path={path + '/:id'}>
          <Production getList={getList} />
        </Route>
        <Route exact path={path}>
          <Production getList={getList} />
        </Route>
      </Switch>
    </>
  );
}

export default ProductionHome;
