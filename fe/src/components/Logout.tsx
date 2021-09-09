import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CookieContext,
  DefaultUserProperties,
  UserContext,
} from '../context/UserContext';
import { CookiesCtxType, setUserType } from '../hooks/LoginHooks';

export default function Logout() {
  const history = useHistory();

  const { setUser }: setUserType = useContext(UserContext);
  const cookies: CookiesCtxType = useContext(CookieContext);

  const LogoutHandler = () => {
    if (!cookies) return;
    cookies.remove(process.env.REACT_APP_COOKIE_NAME!);
    setUser(DefaultUserProperties);
    history.push('/login');
  };
  return (
    <>
      <button className='btn btn-primary mx-5' onClick={LogoutHandler}>
        logout
      </button>
    </>
  );
}
