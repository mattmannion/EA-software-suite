import { UpdateProcess } from '../../../../axios/axios_process';
import { btn_pd, time_stamp } from '../../../../util/util';

const check = <span>&#10003;</span>;

const MarkItem = ({ data, callback }) => (
  <td>
    <div className='production__process'>
      <button
        onClick={callback}
        onMouseDown={btn_pd}
        className={`production__marked-item btn btn-${
          data === '' ? 'secondary' : 'success'
        }`}
      >
        {check}
      </button>
      <div className='mt-2'>
        {data === '' || data === null ? (
          <div>&nbsp;</div>
        ) : (
          <strong>{data}</strong>
        )}
      </div>
    </div>
  </td>
);

export default function Process({
  pallet,
  tack,
  assembled,
  completed,
  o_id,
  od_id,
  setList,
}) {
  const date_completed = async (e, path, data) => {
    btn_pd(e);
    if (data === '')
      return await UpdateProcess(
        `${path}/${o_id}&${od_id}`,
        time_stamp(),
        setList
      );
    if (data !== '')
      return await UpdateProcess(`${path}/${o_id}&${od_id}`, '', setList);
  };

  const mark_completed = async (e, path, data) => {
    btn_pd(e);
    if (data === '')
      return await UpdateProcess(`${path}/${o_id}&${od_id}`, 'Y', setList);
    if (data !== '')
      return await UpdateProcess(`${path}/${o_id}&${od_id}`, '', setList);
  };

  return (
    <>
      <MarkItem
        data={pallet}
        callback={e => date_completed(e, '/pallet', pallet)}
      />
      <MarkItem data={tack} callback={e => date_completed(e, '/tack', tack)} />
      <MarkItem
        data={assembled}
        callback={e => date_completed(e, '/assembled', assembled)}
      />
      <MarkItem
        data={completed}
        callback={e => mark_completed(e, '/completed', completed)}
      />
    </>
  );
}
