import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { modalStyles } from '../../../../util/modal_util';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'transparent';

export default function ProdModal({ slug, children }) {
  const history = useHistory();
  const [getIsModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  function closeModal() {
    setIsModalOpen(false);
    history.push(slug);
  }

  return (
    <>
      <Link to={slug} className='btn btn-warning m-5' onClick={openModal}>
        Edit
      </Link>
      <Modal
        isOpen={getIsModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='d-flex justify-content-center'>
          <h2 className='text-center'>Edit Record &nbsp;</h2>
          <button className='btn btn-danger' onClick={closeModal}>
            &#x2715;
          </button>
        </div>
        {children}
      </Modal>
    </>
  );
}
