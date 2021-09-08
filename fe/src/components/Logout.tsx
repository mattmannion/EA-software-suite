import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CookieContext,
  DefaultUserProperties,
  UserContext,
} from '../context/UserContext';

export default function Logout() {
  const history = useHistory();

  const { setUser }: any = useContext(UserContext);
  const cookies: any = useContext(CookieContext);

  const LogoutHandler = () => {
    cookies.remove(process.env.REACT_APP_COOKIE_NAME);
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
