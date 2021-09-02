import axios from 'axios';
import { FetchOrdersJSON } from './axios_production';
import { api_path } from './axios_properties';

export const UpdateProcess = async (path, body, setList) => {
  await axios.put(`${api_path}/orders/update/process${path}`, { body });

  FetchOrdersJSON('/production', setList);
};
