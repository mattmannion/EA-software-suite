import { WaitTime, RemoveXML } from '../logic/Production';
import { Link } from 'react-router-dom';
import ProductionTabs from '../components/ProductionTabs';

export default function Production({ getList }) {
  if (getList.length === 0)
    return (
      <>
        <strong className='d-flex justify-content-center align-items-center bg-primary text-white p-2'>
          Production
        </strong>
        <strong className='d-flex justify-content-center align-items-center'>
          Loading...
        </strong>
        <ProductionTabs />
      </>
    );

  return (
    <>
      <div className='d-flex justify-content-center align-items-center bg-primary text-white p-2'>
        <strong>Production</strong>
      </div>
      <table className='table table-striped table-dark table-hover production__table'>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>
              <div>Product Name</div>
              <div>(Product Code)</div>
            </th>
            <th>Notes/</th>
            <th>Pallet/</th>
            <th>Tack/</th>
            <th>Assembled</th>
            <th>
              <div>Wait Time</div>
            </th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {getList.map(data => {
            // stores table info for nested mapping
            const {
              id,
              order_id,
              full_name,
              product_name,
              product_code,
              completed,
              notes,
              pallet,
              tack,
              assembled,
              order_date,
            } = data;
            return (
              <tr key={id}>
                <th>{order_date}</th>
                <th>{order_id}</th>
                <td>{full_name}</td>
                <td>
                  <p>{RemoveXML(product_name)}</p>
                  <p>({product_code})</p>
                </td>
                <td>{notes === '' ? 'No' : 'Yes'}</td>
                <td>{pallet === '' ? 'No' : 'Yes'}</td>
                <td>{tack === '' ? 'No' : 'Yes'}</td>
                <td>{assembled === '' ? 'No' : 'Yes'}</td>
                <td>
                  {/* <div>{WaitTime(order_date).days} days</div> */}
                  <div>{WaitTime(order_date).weeks} weeks</div>
                </td>
                <td>{completed === 'N' ? 'No' : 'Yes'}</td>
                <td>
                  <Link to='' className='btn btn-warning m-5'>
                    Edit
                  </Link>
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
