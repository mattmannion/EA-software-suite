import { createContext } from 'react';
import Cookies from 'universal-cookie';
import { CookiesCtxType } from '../hooks/LoginHooks';

interface DefaultUserContextIF {
  getUser: {
    username: string | null;
    permissions: string | null;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: null;
      permissions: null;
    }>
  >;
}

export const DefaultUserProperties = { username: null, permissions: null };

export const CookieContext = createContext<Cookies | null>(null);
export const UserContext = createContext<DefaultUserContextIF>(
  {} as DefaultUserContextIF
);

export const UserCheck = async (
  cookies: CookiesCtxType,
  pathname: string,
  history: any,
  setUser: any
): Promise<boolean> => {
  const current_cookie = cookies?.get(process.env.REACT_APP_COOKIE_NAME!);

  // checked to see if you are logged in and are trying to login again
  if (pathname === '/login' && current_cookie) {
    history.push('/');
    return true;
  }
  // if (pathname === '/login') return false;
  // moves you to login if you are not logged in
  if (!current_cookie) {
    await history.push('/login');
    return false;
  }
  // sets user info based on cookie info
  // empty or otherwise
  await setUser(current_cookie);
  return true;
};
