import axios from 'axios';
import { api_path, headers } from './axios_properties';

// this fetch exposes the raw data resp for text search
export const FetchOrdersJSON = async (path, setData) => {
  const { data } = await axios.get(`${api_path}/orders${path}`, headers);

  if (!data) return console.log('no response...');
  if (!data) return setData(null);
  // data is from axios and data.data is the array
  // contained within the response
  if (!Array.isArray(data.data)) return setData(null);

  setData(data.data);

  return JSON.stringify(data);
};

export const UpdateNotes = async (o_id, od_id, getCurrentNote, setList) => {
  await axios.put(
    `${api_path}/orders/update/notes/${o_id}&${od_id}`,
    { notes: getCurrentNote },
    headers
  );

  await FetchOrdersJSON('/production', setList);
};