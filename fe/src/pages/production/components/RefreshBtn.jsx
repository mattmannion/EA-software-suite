import { DataFetch } from '../../../hooks/LoginHooks';

// this grabs the relevant data from volusions db
// and updates our db to match the newest info
// this also triggers useSearchArrayFlush
// custom hook. See that hook for more info.
const refresh_list = async (o_id, od_id, setList, path) => {
  // path starts at orders
  await fetch(
    `${process.env.REACT_APP_API_PATH}/orders/update/${o_id}&${od_id}`,
    { method: 'put' }
  );

  await DataFetch(path, setList);
};
export default function RefreshBtn({
  order_id,
  order_detail_id,
  setList,
  path,
}) {
  return (
    <>
      <button
        className='btn btn-success reset-button'
        onClick={() => refresh_list(order_id, order_detail_id, setList, path)}
      >
        &#x21bb;
      </button>
    </>
  );
}
