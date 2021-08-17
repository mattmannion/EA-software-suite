import moment from 'moment';

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

export const sleep = sec => new Promise(res => setTimeout(res, sec * 1000));
