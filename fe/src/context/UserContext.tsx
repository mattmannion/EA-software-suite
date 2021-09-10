import { createContext } from 'react';
import Cookies from 'universal-cookie';

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
  cookies: any,
  pathname: string,
  history: any,
  setUser: any
): Promise<boolean> => {
  let current_cookie = cookies.get(process.env.REACT_APP_COOKIE_NAME);
  if (pathname === '/login') return false;
  if (!current_cookie) {
    await history.push('/login');
    return false;
  }
  await setUser(current_cookie);
  return true;
};
