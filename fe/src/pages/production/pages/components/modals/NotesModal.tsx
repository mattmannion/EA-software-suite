// import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { modalStyles } from '../../../../../util/modal_util';
import NotesForm from '../form/NotesForm';
import { useModalHook } from '../../../../../hooks/ModalHooks';
import { btn_pd } from '../../../../../util/util';

interface NoteProps {
  slug: string;
  name: string;
  notes: string;
  id: number;
}

Modal.setAppElement('#root');

export default function NoteModal({ slug, name, notes, id }: NoteProps) {
  const { getIsModalOpen, openModal, closeModal } = useModalHook(slug);

  return (
    <>
      <button
        className='production__edit-notes'
        onClick={openModal}
        onMouseDown={btn_pd}
      >
        <div>{name}</div>
      </button>
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
          id={id}
          // getIsModalOpen={getIsModalOpen}
          // o_id={o_id}
          // od_id={od_id}
        />
      </Modal>
    </>
  );
}
