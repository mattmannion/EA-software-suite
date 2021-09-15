import Modal from 'react-modal';
import { modalStyles } from '../../../../../util/modal_util';
import { useModalHook } from '../../../../../hooks/ModalHooks';
import { useLocation } from 'react-router';
import { OrderListIF } from '../../../../../../types/pages/production/pages/production';
import { btn_pd } from '../../../../../util/util';
import {
  DeleteItemRow,
  FetchList,
} from '../../../../../axios/axios_production';

const path = '/production';

function delete_row(
  id: number,
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>
) {
  console.log(id);
  DeleteItemRow(id);
  FetchList(path, setList);
}

interface DeleteBtnIF {
  id: number;
  closeModal: () => void;
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>;
}

function DeleteBtn({ id, closeModal, setList }: DeleteBtnIF) {
  function handleOnClick() {
    delete_row(id, setList);
    closeModal();
  }
  return (
    <div
      className='d-flex flex-row justify-content-evenly
     align-items-center'
    >
      <button className='btn btn-danger' onClick={handleOnClick}>
        Yes
      </button>
      <button className='btn btn-secondary' onClick={closeModal}>
        No
      </button>
    </div>
  );
}

interface DeleteConfirmModalIF {
  id: number;
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>;
}

export default function DeleteConfirmModal({
  id,
  setList,
}: DeleteConfirmModalIF) {
  const { pathname } = useLocation();
  const { getIsModalOpen, openModal, closeModal } = useModalHook(pathname);

  return (
    <>
      <button
        className='btn btn-danger'
        onClick={openModal}
        onMouseDown={btn_pd}
      >
        &#x2715;
      </button>
      <Modal
        isOpen={getIsModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='d-flex justify-content-center'>
          <h2 className='text-center'>Delete Item &nbsp;</h2>
          <button className='btn btn-danger' onClick={closeModal}>
            &#x2715;
          </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <strong className='m-2'>Warning:</strong>
          <p>This action cannot be reversed</p>
        </div>
        <DeleteBtn id={id} closeModal={closeModal} setList={setList} />
      </Modal>
    </>
  );
}
