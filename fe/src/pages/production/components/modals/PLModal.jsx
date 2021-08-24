import Modal from 'react-modal';
import { modalStyles } from '../../../../util/modal_util';
import { useModalHook } from '../../../../hooks/ModalHooks';
import { btn_pd } from '../../../../util/util';

Modal.setAppElement('#root');

export default function NoteModal({ getList }) {
  const slug = '/production';
  const { getIsModalOpen, openModal, closeModal } = useModalHook(slug);

  return (
    <>
      <button
        className='btn btn-success'
        onClick={openModal}
        onMouseDown={btn_pd}
      >
        &#9776;
      </button>
      <Modal
        isOpen={getIsModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='d-flex justify-content-center'>
          <h2 className='text-center mx-5'>Product List</h2>
          <button className='btn btn-danger' onClick={closeModal}>
            &#x2715;
          </button>
        </div>
        <table className='table table-striped  table-hover table-sm table-responsive-sm'>
          <thead>
            <tr>
              <th>Product Name(code)</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>test</th>
              <td>8</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
}
