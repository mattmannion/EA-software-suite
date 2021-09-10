import { useContext } from 'react';
import { UpdateProcess } from '../../../../../axios/axios_process';
import { ListCtx } from '../../../../../context/ProdContext';
import { btn_pd, time_stamp } from '../../../../../util/util';
import { setListIF } from '../../../ProductionHome';

const check = <span>&#10003;</span>;

interface MarkItemProps {
  process_type: string;
  callback: (e: any) => void;
}

const MarkItem = ({ process_type, callback }: MarkItemProps) => (
  <td>
    <div className='production__process'>
      <button
        onClick={callback}
        onMouseDown={btn_pd}
        className={`production__marked-item btn btn-${
          process_type === '' ? 'secondary' : 'success'
        }`}
      >
        {check}
      </button>
      <div className='mt-2'>
        {process_type === '' || process_type === null ? (
          <div>&nbsp;</div>
        ) : (
          <strong>{process_type}</strong>
        )}
      </div>
    </div>
  </td>
);

interface ProcessProps {
  pallet: string;
  tack: string;
  assembled: string;
  completed: string;
  id: number;
  o_id: string;
  od_id: string;
}

export default function Process({
  pallet,
  tack,
  assembled,
  completed,
  id,
  o_id,
  od_id,
}: ProcessProps) {
  const { setList }: setListIF = useContext(ListCtx);

  const date_completed = async (e: any, path: string, process_type: string) => {
    btn_pd(e);
    if (process_type === '')
      return await UpdateProcess(
        `${path}/${id}&${o_id}&${od_id}`,
        time_stamp(),
        setList
      );
    if (process_type !== '')
      return await UpdateProcess(`${path}/${id}&${o_id}&${od_id}`, '', setList);
  };

  const mark_completed = async (e: any, path: string, process_type: string) => {
    btn_pd(e);
    if (process_type === '')
      return await UpdateProcess(
        `${path}/${id}&${o_id}&${od_id}`,
        'Y',
        setList
      );
    if (process_type !== '')
      return await UpdateProcess(`${path}/${id}&${o_id}&${od_id}`, '', setList);
  };

  return (
    <>
      <MarkItem
        process_type={pallet}
        callback={(e: any) => date_completed(e, '/pallet', pallet)}
      />
      <MarkItem
        process_type={tack}
        callback={(e: any) => date_completed(e, '/tack', tack)}
      />
      <MarkItem
        process_type={assembled}
        callback={(e: any) => date_completed(e, '/assembled', assembled)}
      />
      <MarkItem
        process_type={completed}
        callback={(e: any) => mark_completed(e, '/completed', completed)}
      />
    </>
  );
}
