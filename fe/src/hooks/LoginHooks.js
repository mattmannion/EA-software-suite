import { useHistory, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  CookieContext,
  UserCheck,
  UserContext,
} from '../context/UserContext.js';
import { api_path } from '../axios/axios_properties.js';
import { fetchData } from '../handles/FormHandles.js';

// for users
export const useFetchGateLogin_Users = current_data_set => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { getUser, setUser } = useContext(UserContext);

  const cookies = useContext(CookieContext);

  const [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (getFetchGate) fetchData(current_data_set);
  }, [getFetchGate, pathname, current_data_set]);

  return getUser;
};

// for production
export const DataFetch = async (path, setData) => {
  let response = await fetch(`${api_path}/orders${path}`, {
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
  if (!data) return setData(null);
  if (!Array.isArray(data)) return setData(null);

  setData(data);

  return json;
};

export const useLogin = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { getUser, setUser } = useContext(UserContext);

  const cookies = useContext(CookieContext);

  useEffect(
    () => UserCheck(cookies, pathname, history, setUser),
    // eslint-disable-next-line
    []
  );

  return getUser;
};

export const useFetchGateLogin_Prod = (current_path, current_data_set) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { getUser, setUser } = useContext(UserContext);

  const cookies = useContext(CookieContext);

  const [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (getFetchGate) DataFetch(current_path, current_data_set);
  }, [getFetchGate, pathname, current_path, current_data_set]);

  return getUser;
};
