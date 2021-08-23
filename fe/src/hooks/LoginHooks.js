import { useHistory, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  CookieContext,
  UserCheck,
  UserContext,
} from '../context/UserContext.js';
import { fetchData } from '../handles/FormHandles.js';
import { FetchOrdersJSON } from '../axios/axios_production';

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
    if (getFetchGate) FetchOrdersJSON(current_path, current_data_set);
  }, [getFetchGate, pathname, current_path, current_data_set]);

  return getUser;
};
