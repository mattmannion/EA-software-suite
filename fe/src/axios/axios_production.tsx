import axios from 'axios';
import { OrderListIF } from '../../types/pages/production/pages/production';
import { api_path } from '../env';

// this fetch exposes the raw data resp for text search
export const FetchList = async (path: string, setData: any) => {
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
  getCurrentNote: any,
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>
) => {
  await axios.put(`${api_path}/orders/update/notes/${id}`, {
    notes: getCurrentNote,
  });

  await FetchList('/production', setList);
};

export const DeleteItemRow = async (id: number) =>
  await axios.delete(api_path + '/orders/delete/' + id);

export const InsertOrderById = async (id: number) => {
  // console.log('here');
  if (id < 99999) return;
  console.log(id);
  await axios.post(`${api_path}/orders/insert_order/${id}`);
};
