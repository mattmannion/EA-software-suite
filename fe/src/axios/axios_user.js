import axios from 'axios';
import { AxiosConfig, headers, api_path } from './axios_properties';

export const users_path = `${api_path}/users`;
export const users_slug = '/users';

export const getUsers = async () => await axios.get(users_path, AxiosConfig);

export const createUser = async fields =>
  await axios.post(
    users_path,
    {
      headers,
      ...fields,
    },
    AxiosConfig
  );

export const updateUser = async (id, fields) =>
  await axios.put(`${users_path}/${id}`, { headers, ...fields }, AxiosConfig);

export const deleteUser = async id =>
  await axios.delete(`${users_path}/${id}`, AxiosConfig);
