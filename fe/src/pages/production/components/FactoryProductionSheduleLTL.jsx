import React from 'react';
import moment from 'moment';

// Removes XML from some entries
const RemoveXML = ProductName =>
  // if ProductName starts with <!30> or something similar
  // it is checked for and only removed when found
  ProductName.includes('>') ? ProductName.split('>')[1] : ProductName;

const WaitTime = OrderTime => {
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

export default function FactoryProductScheduleLTL({ getVolData }) {
  if (getVolData === null)
    return (
      <strong className='d-flex justify-content-center align-items-center'>
        No Data
      </strong>
    );

  if (getVolData.length === 0)
    return (
      <strong className='d-flex justify-content-center align-items-center'>
        Loading...
      </strong>
    );

  return (
    <>
      <table className='table table-striped table-dark table-hover'>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>
              <div>Product Name</div>
              <div>(Product Code)</div>
            </th>
            <th>Shipped</th>
            <th>Completed</th>
            <th>Notes</th>
            <th>Pallet</th>
            <th>Tack</th>
            <th>Assembled</th>
            <th>
              <div>Wait Time</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {getVolData.map((data, index) => {
            // stores table info for nested mapping
            const {
              order_id,
              full_name,
              product_name,
              product_code,
              shipped,
              completed,
              notes,
              pallet,
              tack,
              assembled,
              order_date,
            } = data;
            return (
              <tr key={index}>
                <th>{order_date}</th>
                <td>{order_id}</td>
                <td>{full_name}</td>
                <td>
                  <div>{RemoveXML(product_name)}</div>
                  <div>({product_code})</div>
                </td>
                <td>{shipped === 'N' ? 'No' : 'Yes'}</td>
                <td>{completed === '' ? 'No' : 'Yes'}</td>
                <td>{notes === '' ? 'No' : 'Yes'}</td>
                <td>{pallet === '' ? 'No' : 'Yes'}</td>
                <td>{tack === '' ? 'No' : 'Yes'}</td>
                <td>{assembled === '' ? 'No' : 'Yes'}</td>
                <td>
                  {/* <div>{WaitTime(order_date).days} days</div> */}
                  <div>{WaitTime(order_date).weeks} weeks</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
