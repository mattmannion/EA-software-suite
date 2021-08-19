import { DataFetch } from '../../../hooks/LoginHooks';

const refresh_list = async (o_id, od_id, setList) => {
  await fetch(
    `${process.env.REACT_APP_API_PATH}/orders/update/${o_id}&${od_id}`,
    {
      method: 'put',
    }
  );

  await DataFetch('/production', setList);
};
export default function RefreshBtn({ order_id, order_detail_id, setList }) {
  return (
    <>
      <button
        className='btn btn-success'
        onClick={() => refresh_list(order_id, order_detail_id, setList)}
      >
        &#x21bb;
      </button>
    </>
  );
}
