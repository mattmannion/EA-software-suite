import { createContext } from 'react';

export const CookieContext = createContext(null);
export const UserContext = createContext(null);

export const DefaultUserProperties = { username: null, permissions: null };

export const UserCheck = async (cookies, pathname, history, setUser) => {
  let current_cookie = cookies.get(process.env.REACT_APP_COOKIE_NAME);
  if (pathname === '/login') return;
  if (!current_cookie) {
    await history.push('/login');
    return false;
  }
  await setUser(current_cookie);
  return true;
};
