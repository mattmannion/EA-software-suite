import { DataFetch } from '../../../hooks/LoginHooks';

const refresh_list = async (
  o_id,
  od_id,
  setList,
  getSearchTerm,
  SearchHandler
) => {
  let current_term = getSearchTerm;
  await fetch(
    `${process.env.REACT_APP_API_PATH}/orders/update/${o_id}&${od_id}`,
    {
      method: 'put',
    }
  );

  await DataFetch('/production', setList);
  SearchHandler('');
  SearchHandler(current_term);
};
export default function RefreshBtn({
  order_id,
  order_detail_id,
  setList,
  getSearchTerm,
  SearchHandler,
}) {
  return (
    <>
      <button
        className='btn btn-success'
        onClick={() => {
          refresh_list(
            order_id,
            order_detail_id,
            setList,
            getSearchTerm,
            SearchHandler
          );
        }}
      >
        &#x21bb;
      </button>
    </>
  );
}
