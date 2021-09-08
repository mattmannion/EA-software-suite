import { FC } from 'react';
import { OrderList } from '../../../../../types/pages/production/pages/production';
import { refresh_list } from '../../../../hooks/SearchHooks';

interface RefreshBtnProps {
  id: number;
  order_id: string;
  order_detail_id: string;
  setList: React.Dispatch<React.SetStateAction<OrderList[]>>;
  path: string;
}

const RefreshBtn: FC<RefreshBtnProps> = ({
  id,
  order_id,
  order_detail_id,
  setList,
  path,
}) => {
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
};

export default RefreshBtn;
