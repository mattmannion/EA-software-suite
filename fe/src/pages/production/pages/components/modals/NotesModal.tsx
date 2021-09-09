import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { modalStyles } from '../../../../../util/modal_util';
import NotesForm from '../form/NotesForm';
import { useModalHook } from '../../../../../hooks/ModalHooks';

interface NoteProps {
  slug: string;
  name: string;
  notes: string;
  id: number;
  o_id: string;
  od_id: string;
}

Modal.setAppElement('#root');

export default function NoteModal({
  slug,
  name,
  notes,
  id,
  o_id,
  od_id,
}: NoteProps) {
  const { getIsModalOpen, openModal, closeModal } = useModalHook(slug);

  return (
    <>
      <Link to={slug} className='production__edit-notes' onClick={openModal}>
        <div>{name}</div>
      </Link>
      <Modal
        isOpen={getIsModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='d-flex justify-content-center'>
          <h2 className='text-center'>Edit Notes &nbsp;</h2>
        </div>
        <button
          className='btn btn-danger notes-form__close-btn'
          onClick={closeModal}
        >
          &#x2715;
        </button>
        <NotesForm
          notes={notes}
          closeModal={closeModal}
          getIsModalOpen={getIsModalOpen}
          id={id}
          o_id={o_id}
          od_id={od_id}
        />
      </Modal>
    </>
  );
}