import React, { useEffect, useContext } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { useState } from 'react';
import { api_path } from '../../axios/axios_properties';
import NavBar from '../../components/NavBar';
import FactoryProductScheduleLTL from './components/FactoryProductionSheduleLTL';
import ProductionTabs from './components/ProductionTabs';
import {
  UserContext,
  CookieContext,
  UserCheck,
} from '../../context/UserContext';

function ProductionHome() {
  let { path } = useRouteMatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const { setUser } = useContext(UserContext);

  const cookies = useContext(CookieContext);

  let [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  // starts as null in the event that the fetched
  // data is null or the array is null
  const [getVolData, setVolData] = useState([]);

  const volusionFetch = async () => {
    let response = await fetch(`${api_path}/orders/filtered`, {
      method: 'get',
      headers: {
        origin: process.env.REACT_APP_LOCATION,
      },
    });

    if (!response) return console.log('no response...');

    // transform response to text stored as json
    const json = await response.text();

    const { data } = JSON.parse(json);

    // both if's handle the event of no data or data not being and array
    if (!data) return setVolData(null);
    if (!Array.isArray(data)) return setVolData(null);

    setVolData(data);

    return json;
  };

  // checks if there is a user logged before loading data
  useEffect(() => {
    if (getFetchGate) volusionFetch();
  }, [getFetchGate]);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={path}>
          <FactoryProductScheduleLTL getVolData={getVolData} />
          <ProductionTabs />
        </Route>
        <Route path={path + '/completed'}>
          <div>Placeholder for Completed Orders</div>
          <ProductionTabs />
        </Route>
        <Route path={path + '/shipped'}>
          <div>Placeholder for Shipped Orders</div>
          <ProductionTabs />
        </Route>
      </Switch>
    </>
  );
}

export default ProductionHome;
