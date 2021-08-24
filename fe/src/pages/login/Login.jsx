import { withRouter } from 'react-router-dom';
import CurrentUser from '../../components/CurrentUser';
import { useLogin } from '../../hooks/LoginHooks';

function Login() {
  const { getLoginData, getLoginStatus, LoginChangeHandler, LoginSubmit } =
    useLogin();

  return (
    <>
      <CurrentUser />
      <form
        className='d-flex flex-column justify-content-center align-items-center m-5 p-2 '
        onSubmit={LoginSubmit}
      >
        <div className='d-flex flex-column justify-content-center align-items-center m-2'>
          <strong>Everything Attachments</strong>
          <em>Software Suite</em>
        </div>
        <label htmlFor='username'>
          <input
            type='text'
            placeholder='username'
            name='username'
            autoComplete='username'
            className='m-1'
            value={getLoginData.username}
            onChange={LoginChangeHandler}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            placeholder='password'
            name='password'
            autoComplete='current-password'
            value={getLoginData.password}
            onChange={LoginChangeHandler}
          />
        </label>
        {getLoginStatus === true ? (
          <p></p>
        ) : (
          <p className='mt-3'>Incorrect username or password</p>
        )}
        <button type='submit' className='btn btn-primary m-1'>
          Login
        </button>
      </form>
    </>
  );
}

export default withRouter(Login);
