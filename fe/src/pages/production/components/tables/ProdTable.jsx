import { WaitTime, RemoveXML } from '../../../../util/util';
import NotesModal from '../modals/NotesModal';
import { production_slug } from '../../../../util/modal_util';
import OrderLink from '../inputs/OrderLink';
import RefreshBtn from '../inputs/RefreshBtn';

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
            <th>Product Name(Code)</th>
            <th>Options</th>
            <th>Order Status</th>
            <th>Notes</th>
            <th>Pallet</th>
            <th>Tack</th>
            <th>Assembled</th>
            <th>Completed</th>
            <th>Wait Time</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(data => {
            let {
              id,
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
              <tr key={id}>
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
                <td className='production__options'>{order_option}</td>
                <td>{order_status}</td>
                <td>
                  <NotesModal
                    slug={`${production_slug}/${order_id}&${order_detail_id}`}
                    name={
                      notes === '' || notes === '\n' || notes === null
                        ? 'Click to Add'
                        : notes
                    }
                    notes={notes}
                    o_id={order_id}
                    od_id={order_detail_id}
                    setList={setList}
                  />
                </td>
                <td>{pallet === '' ? 'No' : 'Yes'}</td>
                <td>{tack === '' ? 'No' : 'Yes'}</td>
                <td>{assembled === '' ? 'No' : 'Yes'}</td>
                <td>{completed === '' ? 'No' : 'Yes'}</td>
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
