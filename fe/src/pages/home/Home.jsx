import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useLogin } from '../../hooks/LoginHooks';

function Home() {
  useLogin();

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
