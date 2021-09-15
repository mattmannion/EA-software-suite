import Modal from 'react-modal';
import { modalStyles } from '../../../../../util/modal_util';
import { useModalHook } from '../../../../../hooks/ModalHooks';
import { useLocation } from 'react-router';
// import { OrderListIF } from '../../../../../../types/pages/production/pages/production';
import { btn_pd } from '../../../../../util/util';
import AddItemForm from '../form/AddItemForm';
// import { FetchList } from '../../../../../axios/axios_production';

export default function AddItem() {
  const { pathname } = useLocation();
  const { closeModal, openModal, getIsModalOpen } = useModalHook(pathname);

  return (
    <>
      <button
        className='btn btn-info production__plus-btn'
        onClick={openModal}
        onMouseDown={btn_pd}
      >
        +
      </button>
      <Modal
        style={modalStyles}
        isOpen={getIsModalOpen}
        onRequestClose={closeModal}
      >
        <div className='d-flex justify-content-center'>
          <h2 className='text-center'>Add Item(s) &nbsp;</h2>
          <button className='btn btn-danger' onClick={closeModal}>
            &#x2715;
          </button>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <AddItemForm closeModal={closeModal} />
        </div>
      </Modal>
    </>
  );
}
