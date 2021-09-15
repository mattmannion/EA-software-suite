import { handleDelete, InitialFormDataIF } from '../../../handles/FormHandles';
import { users_slug } from '../../../axios/axios_user';

interface DeleteProps {
  id: number;
  closeModal: () => void;
  setData: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>;
  history: any;
}

export default function Delete({
  id,
  closeModal,
  setData,
  history,
}: DeleteProps) {
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
      <button className='btn btn-secondary' onClick={closeModal}>
        No
      </button>
    </div>
  );
}
