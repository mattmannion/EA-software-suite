import axios from 'axios';
import { api_path } from '../env';

export const PostLogin = async (path: string, getLoginData: any) => {
  const { data } = await axios.post(`${api_path}${path}`, {
    username: getLoginData.username,
    password: getLoginData.password,
  });

  return data;
};
