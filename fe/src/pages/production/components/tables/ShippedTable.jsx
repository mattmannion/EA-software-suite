import { WaitTime, RemoveXML } from '../../../../util/util';
import OrderLink from '../inputs/OrderLink';
import RefreshBtn from '../inputs/RefreshBtn';

export default function ShippedTable({ currentItems, setList }) {
  return (
    <>
      <table className='table table-striped table-dark table-hover table-sm table-responsive-sm'>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Refresh</th>
            <th>Customer</th>
            <th>
              <div>Product Name</div>
              <div>(Code)</div>
            </th>
            <th>Order Status</th>
            <th>Notes</th>
            <th>
              <div>Wait Time</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data, index) => {
            // stores table info for nested mapping
            const {
              order_id,
              order_detail_id,
              full_name,
              product_name,
              product_code,
              order_status,
              notes,
              order_date,
            } = data;
            return (
              <tr key={index}>
                <th>{order_date}</th>
                <th>
                  <OrderLink order_id={order_id} />
                </th>
                <td>
                  <RefreshBtn
                    order_id={order_id}
                    order_detail_id={order_detail_id}
                    setList={setList}
                    path='/production/shipped'
                  />
                </td>
                <td>{full_name}</td>
                <td>
                  {RemoveXML(product_name)}({product_code})
                </td>
                <td>{order_status}</td>
                <td>{notes === '' ? 'No' : 'Yes'}</td>
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
