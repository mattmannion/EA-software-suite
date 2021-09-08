import axios from 'axios';
import { api_path } from './axios_properties';

export const users_path = `${api_path}/users`;
export const users_slug = '/users';

export const getUsers = async () => await axios.get(users_path);

export const createUser = async (fields: any) =>
  await axios.post(users_path, {
    ...fields,
  });

export const updateUser = async (id: string, fields: any) =>
  await axios.put(`${users_path}/${id}`, { ...fields });

export const deleteUser = async (id: number) =>
  await axios.delete(`${users_path}/${id}`);
