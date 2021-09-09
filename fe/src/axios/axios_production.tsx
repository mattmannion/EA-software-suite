import axios from 'axios';
import { OrderListIF } from '../../types/pages/production/pages/production';
import { api_path } from './axios_properties';

// this fetch exposes the raw data resp for text search
export const FetchOrdersJSON = async (path: string, setData: any) => {
  const { data } = await axios.get(`${api_path}/orders${path}`);

  if (!data) return console.log('no response...');
  if (!data) return setData(null);
  // data is from axios and data.data is the array
  // contained within the response
  if (!Array.isArray(data.data)) return setData(null);

  setData(data.data);

  return JSON.stringify(data);
};

export const UpdateNotes = async (
  id: number,
  o_id: string,
  od_id: string,
  getCurrentNote: any,
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>
) => {
  await axios.put(`${api_path}/orders/update/notes/${id}&${o_id}&${od_id}`, {
    notes: getCurrentNote,
  });

  await FetchOrdersJSON('/production', setList);
};