import { WaitTime, RemoveXML } from '../../../../../util/util';
import NotesModal from '../modals/NotesModal';
import { production_slug } from '../../../../../util/modal_util';
import OrderLink from '../io/OrderLink';
import RefreshBtn from '../io/RefreshBtn';
import Process from '../io/Process';
import { OrderListIF } from '../../../../../../types/pages/production/pages/production';

interface ProdTableProps {
  currentItems: OrderListIF[];
}

export default function ProdTable({ currentItems }: ProdTableProps) {
  return (
    <>
      <table className='table table-striped table-dark table-hover production__table'>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Order ID (DetailID)</th>
            <th>Refresh</th>
            <th>Customer</th>
            <th>Product Name(Code)</th>
            <th>Options</th>
            <th>Order Status</th>
            <th>Notes</th>
            <th>Pallet</th>
            <th>Tacked</th>
            <th>Assem</th>
            <th>Compl</th>
            <th>Wait Time</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data: OrderListIF, i) => {
            let {
              id,
              order_detail_id,
              order_date,
              order_id,
              full_name,
              product_name,
              product_code,
              order_options,
              order_status,
              completed,
              notes,
              pallet,
              tack,
              assembled,
            } = data;
            return (
              <tr key={i}>
                <th>{order_date}</th>
                <th>
                  <OrderLink order_id={order_id} />
                </th>
                <td>
                  <RefreshBtn
                    id={id}
                    order_id={order_id}
                    order_detail_id={order_detail_id}
                    path='/production'
                  />
                </td>
                <td>{full_name}</td>
                <td>
                  <div>{RemoveXML(product_name)}</div>
                  <div>({product_code})</div>
                </td>
                <td className='production__options'>{order_options}</td>
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
                    id={id}
                    o_id={order_id}
                    od_id={order_detail_id}
                  />
                </td>
                <Process
                  pallet={pallet}
                  tack={tack}
                  assembled={assembled}
                  completed={completed}
                  id={id}
                  o_id={order_id}
                  od_id={order_detail_id}
                />
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
