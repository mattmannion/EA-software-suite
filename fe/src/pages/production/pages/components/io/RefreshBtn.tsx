import { useContext } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';
import { api_path } from '../../../../../env';
import { refresh_list } from '../../../../../hooks/SearchHooks';
import { setListIF } from '../../../ProductionHome';

interface RefreshBtnProps {
  id: number;
  order_id: string;
  order_detail_id: string;
  path: string;
}

export default function RefreshBtn({
  id,
  order_id,
  order_detail_id,
  path,
}: RefreshBtnProps) {
  const { setList }: setListIF = useContext(ListCtx);
  return (
    <>
      <button
        className='btn btn-success reset-button'
        onClick={() =>
          refresh_list(
            `${api_path}/orders/update/${id}&${order_id}&${order_detail_id}`,
            setList,
            path
          )
        }
      >
        &#x21bb;
      </button>
    </>
  );
}
