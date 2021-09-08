import moment from 'moment';

export const WaitTime = (OrderTime: string) => {
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
export const RemoveXML = (ProductName: string) =>
  // if ProductName starts with <!30> or something similar
  // it is checked for and only removed when found
  ProductName.includes('>') ? ProductName.split('>')[1] : ProductName;

export const sleep = (sec: number) =>
  new Promise((res) => setTimeout(res, sec * 1000));

export const btn_pd = (e: any) => e.preventDefault();

export const time_stamp = () =>
  new Date()
    .toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
    .split(',')[0];
