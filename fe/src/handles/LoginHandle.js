import { PostLogin } from '../axios/axios_login';

export default async function LoginHandle(
  e,
  history,
  cookies,
  setLoginStatus,
  getLoginData,
  setLoginData,
  InitialLoginData
) {
  e.preventDefault();

  try {
    const login = await PostLogin('/login', getLoginData);

    // checks inputs and db for matching user and password
    if (login.status === 'logged in') {
      // disables failure message
      setLoginStatus(true);

      // sets cookie for site
      let current_user = {
        username: login.data[0].username || null,
        permissions: login.data[0].permissions || null,
      };
      cookies.set(process.env.REACT_APP_COOKIE_NAME, current_user, {
        path: '/',
        maxAge: process.env.REACT_APP_COOKIE_AGE,
        secure: true,
      });

      // sends successful login to root
      history.push('/');
    } else {
      // activates login failure message
      setLoginStatus(false);

      // clears fields upon failure
      setLoginData(InitialLoginData);
    }
  } catch (error) {
    console.log(error);
  }
}
