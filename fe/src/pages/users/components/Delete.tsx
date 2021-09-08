import { withRouter } from 'react-router-dom';
import { handleDelete } from '../../../handles/FormHandles';
import { users_slug } from '../../../axios/axios_user';

function Delete({ id, closeModal, setData, history }: any) {
  return (
    <div
      className='d-flex flex-row justify-content-evenly
     align-items-center'
    >
      <button
        className='btn btn-danger'
        onClick={async () => {
          await handleDelete(id, setData);
          closeModal();
          history.push(users_slug);
        }}
      >
        Yes
      </button>
      <button className='btn btn-secondary' onClick={() => closeModal()}>
        No
      </button>
    </div>
  );
}

export default withRouter(Delete);
