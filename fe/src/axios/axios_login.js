import axios from 'axios';
import { api_path, headers } from './axios_properties';

export const PostLogin = async (path, getLoginData) => {
  const { data } = await axios.post(
    `${api_path}${path}`,
    {
      username: getLoginData.username,
      password: getLoginData.password,
    },
    headers
  );

  return data;
};
