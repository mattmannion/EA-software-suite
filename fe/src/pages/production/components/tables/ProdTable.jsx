import { WaitTime, RemoveXML } from '../../../../util/util';
import ProdModal from '../modals/ProdModal';
import { production_slug } from '../../../../util/modal_util';
import OrderLink from '../OrderLink';
import RefreshBtn from '../RefreshBtn';

export default function ProdTable({ currentItems, setList }) {
  return (
    <>
      <table className='table table-striped table-dark table-hover production__table'>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID</th>
            <th>Refresh</th>
            <th>Customer</th>
            <th>Product Name (Product Code)</th>
            <th>Options</th>
            <th>Order Status</th>
            <th>Notes</th>
            <th>Pallet</th>
            <th>Tack</th>
            <th>Assembled</th>
            <th>Wait Time</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(data => {
            let {
              order_detail_id,
              order_date,
              order_id,
              full_name,
              product_name,
              product_code,
              order_option,
              order_status,
              completed,
              notes,
              pallet,
              tack,
              assembled,
            } = data;
            return (
              <tr key={order_detail_id}>
                <th>{order_date}</th>
                <th>
                  <OrderLink order_id={order_id} />
                </th>
                <td>
                  <RefreshBtn
                    order_id={order_id}
                    order_detail_id={order_detail_id}
                    setList={setList}
                    path='/production'
                  />
                </td>
                <td>{full_name}</td>
                <td>
                  <div>{RemoveXML(product_name)}</div>
                  <div>({product_code})</div>
                </td>
                <td>{order_option}</td>
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
                  <ProdModal slug={production_slug}></ProdModal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
