import axios from 'axios';
import { api_path } from '../env';

export const users_path = `${api_path}/users`;
export const users_slug = '/users';

export const getUsers = async () => await axios.get(users_path);

export function createUser(fields: any) {
  axios.post(users_path, {
    ...fields,
  });
}

export function updateUser(id: string, fields: any) {
  axios.put(`${users_path}/${id}`, { ...fields });
}

export function deleteUser(id: number) {
  axios.delete(`${users_path}/${id}`);
}
