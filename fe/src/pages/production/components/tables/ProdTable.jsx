import { Link } from 'react-router-dom';
import { WaitTime, RemoveXML } from '../../logic/ProductionLogic';

export default function ProdTable({ currentItems }) {
  return (
    <>
      <table className='table table-striped table-dark table-hover production__table'>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product Name (Product Code)</th>
            <th>Order Status</th>
            <th>Notes/</th>
            <th>Pallet/</th>
            <th>Tack/</th>
            <th>Assembled</th>
            <th>Wait Time</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(data => {
            let {
              id,
              order_id,
              full_name,
              product_name,
              product_code,
              order_status,
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
                <td>{order_status}</td>
                <td>{notes === '' ? 'No' : 'Yes'}</td>
                <td>{pallet === '' ? 'No' : 'Yes'}</td>
                <td>{tack === '' ? 'No' : 'Yes'}</td>
                <td>{assembled === '' ? 'No' : 'Yes'}</td>
                <td>
                  {/* <div>{WaitTime(order_date).days} days</div> */}
                  <div>{WaitTime(order_date).weeks} weeks</div>
                </td>
                <td>{completed === '' ? 'No' : 'Yes'}</td>
                <td>
                  <Link to='/production' className='btn btn-warning m-5'>
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
