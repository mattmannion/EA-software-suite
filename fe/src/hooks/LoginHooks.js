import { useHistory, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  CookieContext,
  UserCheck,
  UserContext,
} from '../context/UserContext.js';
import { PostLogin } from '../axios/axios_login.js';
import { fetchData } from '../handles/FormHandles.js';
import { FetchOrdersJSON } from '../axios/axios_production';

export const useLogin = () => {
  // set initial login state values
  const InitialLoginData = {
    username: '',
    password: '',
  };

  // allows path manipulation
  const history = useHistory();

  // state for login data
  const [getLoginData, setLoginData] = useState(InitialLoginData);

  // state for login message
  const [getLoginStatus, setLoginStatus] = useState(true);

  // set Context and Check User
  const cookies = useContext(CookieContext);

  // handles the input box on change data
  const LoginChangeHandler = e => {
    setLoginData({
      ...getLoginData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const LoginSubmit = async e => {
    e.preventDefault();
    try {
      const login = await PostLogin('/login', getLoginData);

      // checks inputs and db for matching user and password
      if (login.status === 'logged in') {
        // disables failure message
        setLoginStatus(true);

        // sets cookie for site
        let current_user = {
          username: login.data[0].username || null,
          permissions: login.data[0].permissions || null,
        };
        cookies.set(process.env.REACT_APP_COOKIE_NAME, current_user, {
          path: '/',
          maxAge: process.env.REACT_APP_COOKIE_AGE,
          secure: true,
        });

        // sends successful login to root
        history.push('/');
      } else {
        // activates login failure message
        setLoginStatus(false);

        // clears fields upon failure
        setLoginData(InitialLoginData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getLoginData, getLoginStatus, LoginChangeHandler, LoginSubmit };
};

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

export const useLoggedIn = () => {
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
