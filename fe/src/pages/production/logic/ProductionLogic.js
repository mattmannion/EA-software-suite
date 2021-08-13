import { api_path } from '../../../axios/axios_properties';
import moment from 'moment';

export const ProductionFetch = async (path, setData) => {
  let response = await fetch(`${api_path}/orders${path}`, {
    method: 'get',
    headers: {
      origin: process.env.REACT_APP_LOCATION,
    },
  });

  if (!response) return console.log('no response...');

  // transform response to text stored as json
  const json = await response.text();

  const { data } = JSON.parse(json);

  // both if's handle the event of no data or data not being and array
  if (!data) return setData(null);
  if (!Array.isArray(data)) return setData(null);

  setData(data);

  return json;
};

export const WaitTime = OrderTime => {
  const [current_m, current_d, current_y] = new Date(Date.now())
    .toLocaleString()
    .split(',')[0]
    .split('/');

  const [order_m, order_d, order_y] = OrderTime.split('/');

  const order_time = moment(new Date(+order_y, +order_m, +order_d));
  const current_time = moment(new Date(+current_y, +current_m, +current_d));

  const days = current_time.diff(order_time, 'days');
  const weeks = current_time.diff(order_time, 'weeks');

  return { days, weeks };
};

// Removes XML from some entries
export const RemoveXML = ProductName =>
  // if ProductName starts with <!30> or something similar
  // it is checked for and only removed when found
  ProductName.includes('>') ? ProductName.split('>')[1] : ProductName;
