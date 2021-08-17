import { withRouter, useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CookieContext } from '../../context/UserContext';
import CurrentUser from '../../components/CurrentUser';
import LoginHandle from '../../handles/LoginHandle';

function Login() {
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

  // handles the input box on change data
  const LoginChangeHandler = e => {
    setLoginData({
      ...getLoginData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // set Context and Check User
  const cookies = useContext(CookieContext);

  return (
    <>
      <CurrentUser />
      <form
        className='d-flex flex-column justify-content-center align-items-center m-5 p-2 '
        onSubmit={async e => {
          await LoginHandle(
            e,
            history,
            cookies,
            setLoginStatus,
            getLoginData,
            setLoginData,
            InitialLoginData
          );
        }}
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
