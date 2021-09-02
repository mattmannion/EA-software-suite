import { refresh_list } from '../../../../hooks/SearchHooks';

export default function RefreshBtn({
  id,
  order_id,
  order_detail_id,
  setList,
  path,
}) {
  return (
    <>
      <button
        className='btn btn-success reset-button'
        onClick={() =>
          refresh_list(
            setList,
            path,
            `${process.env.REACT_APP_API_PATH}/orders/update/${id}&${order_id}&${order_detail_id}`,
            'put'
          )
        }
      >
        &#x21bb;
      </button>
    </>
  );
}
