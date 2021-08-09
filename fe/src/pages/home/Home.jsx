import { Link, useHistory, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import {
  CookieContext,
  UserCheck,
  UserContext,
} from '../../context/UserContext';
import NavBar from '../../components/NavBar';

function Home() {
  const history = useHistory();
  const { pathname } = useLocation();

  const { setUser } = useContext(UserContext);

  const cookies = useContext(CookieContext);

  useEffect(
    () => UserCheck(cookies, pathname, history, setUser),
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <NavBar />
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='m-2'>Software Select</div>
        <div className='d-flex flex-row justify-content-center align-items-center m-5'>
          <Link to='/users' className='btn btn-secondary m-1'>
            To User Panel
          </Link>
          <Link to='/production' className='btn btn-secondary'>
            To Production
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
