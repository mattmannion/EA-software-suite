import { Link } from 'react-router-dom';
import CurrentUser from './CurrentUser';
import Logout from './Logout';

export default function NavBar() {
  return (
    <>
      <div className='navigation-bar'>
        <div className='mx-4'>
          <CurrentUser />
        </div>
        <div>
          <Link to='/' className='btn btn-success'>
            Software Selection
          </Link>
          <Logout />
        </div>
      </div>
      <div className='nav-spacer'>&nbsp;</div>
    </>
  );
}
