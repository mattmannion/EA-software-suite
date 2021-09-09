import { useHistory, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { CookieContext, UserCheck, UserContext } from '../context/UserContext';
import { PostLogin } from '../axios/axios_login';
import { fetchUsers, InitialFormDataIF } from '../handles/FormHandles';
import { FetchOrdersJSON } from '../axios/axios_production';
import Cookies from 'universal-cookie';

export interface getUserIF {
  getUser: {
    username: null;
    permissions: null;
  };
}
export interface setUserType {
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: null;
      permissions: null;
    }>
  >;
}
export type CookiesCtxType = Cookies | null;

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
  const cookies: CookiesCtxType = useContext(CookieContext);

  // handles the input box on change data
  const LoginChangeHandler = (e: any) => {
    setLoginData({
      ...getLoginData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const LoginSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const login = await PostLogin('/login', getLoginData);

      // checks inputs and db for matching user and password
      if (login.status === 'logged in') {
        // disables failure message
        setLoginStatus(true);

        // sets cookie for site
        let current_user = {
          username: login.username || null,
          permissions: login.permissions || null,
        };
        if (!cookies) return;
        cookies.set(process.env.REACT_APP_COOKIE_NAME!, current_user, {
          path: '/',
          maxAge: +process.env.REACT_APP_COOKIE_AGE!,
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
export const useFetchGateLogin_Users = (
  current_data_set: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>
) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { getUser, setUser }: any = useContext(UserContext);

  const cookies: CookiesCtxType = useContext(CookieContext);

  const [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => {
      UserCheck(cookies, pathname, history, setUser)
        .then((res: boolean) => setFetchGate(res))
        .catch((err) => err);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (getFetchGate) fetchUsers(current_data_set);
  }, [getFetchGate, pathname, current_data_set]);

  return getUser;
};

export const useLoggedIn = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { getUser, setUser }: any = useContext(UserContext);

  const cookies: CookiesCtxType = useContext(CookieContext);

  useEffect(
    () => {
      UserCheck(cookies, pathname, history, setUser)
        .then((res) => res)
        .catch((err) => err);
    },
    // eslint-disable-next-line
    []
  );

  return getUser;
};

export const useFetchGateLogin_Prod = (
  current_path: string,
  current_data_set: any
) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { getUser, setUser }: any = useContext(UserContext);

  const cookies: CookiesCtxType = useContext(CookieContext);

  const [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => {
      UserCheck(cookies, pathname, history, setUser)
        .then((res) => setFetchGate(res))
        .catch((err) => err);
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (getFetchGate) FetchOrdersJSON(current_path, current_data_set);
  }, [getFetchGate, pathname, current_path, current_data_set]);

  return getUser;
};
