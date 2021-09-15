import axios from 'axios';
import { api_path } from '../env';
import { FetchList } from './axios_production';

export const UpdateProcess = async (
  path: string,
  body: string,
  setList: any
) => {
  await axios.put(`${api_path}/orders/update/process${path}`, { body });

  FetchList('/production', setList);
};
