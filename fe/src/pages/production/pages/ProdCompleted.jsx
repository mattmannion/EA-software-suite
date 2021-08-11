import { WaitTime, RemoveXML } from '../logic/Production';
import ProductionTabs from '../components/ProductionTabs';

export default function Prod_Completed({ getList }) {
  if (getList.length === 0)
    return (
      <>
        <strong className='d-flex justify-content-center align-items-center bg-success text-white p-2'>
          Completed Orders
        </strong>
        <strong className='d-flex justify-content-center align-items-center'>
          Loading...
        </strong>
        <ProductionTabs />
      </>
    );

  return (
    <>
      <strong className='d-flex justify-content-center align-items-center bg-success text-white p-2'>
        Completed Orders
      </strong>
      <table className='table table-striped table-dark table-hover table-sm table-responsive-sm'>
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
          {getList.map((data, index) => {
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
                <th>{order_id}</th>
                <td>{full_name}</td>
                <td>
                  <div>{RemoveXML(product_name)}</div>
                  <div>({product_code})</div>
                </td>
                <td>{shipped === 'N' ? 'No' : 'Yes'}</td>
                <td>{completed === 'N' ? 'No' : 'Yes'}</td>
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
      <ProductionTabs />
    </>
  );
}
