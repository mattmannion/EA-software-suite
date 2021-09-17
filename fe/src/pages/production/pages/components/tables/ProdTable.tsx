import { WaitTime, RemoveXML } from '../../../../../util/util';
import NotesModal from '../modals/NotesModal';
import { production_slug } from '../../../../../util/modal_util';
import OrderLink from '../io/OrderLink';
import RefreshBtn from '../io/RefreshBtn';
import Process from '../io/Process';
import { OrderListIF } from '../../../../../../types/pages/production/pages/production';
import { useContext } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';
import QueueNumber from '../io/QueueNumber';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';

export default function ProdTable() {
  const { currentItems, setList } = useContext(ListCtx);

  return (
    <>
      <table className='table table-striped table-dark production__table'>
        <thead>
          <tr>
            <th>Q #</th>
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
            <th>Since</th>
            <th>Ordered</th>
            <th></th>
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
                <th>
                  <QueueNumber i={i} />
                </th>
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
                    slug={production_slug}
                    name={
                      notes === '' ||
                      notes === '\n' ||
                      notes === '\n\n' ||
                      notes === '\n\n\n' ||
                      notes === null
                        ? 'Click to Add'
                        : notes
                    }
                    notes={notes}
                    id={id}
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
                <td>{WaitTime(order_date).weeks} weeks</td>
                <td>{WaitTime(order_date).days} days</td>
                <td>
                  <DeleteConfirmModal setList={setList} id={id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
