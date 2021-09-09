import { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderListIF } from '../../../../../types/pages/production/pages/production';
import { UpdateNotes } from '../../../../axios/axios_production';
import { btn_pd } from '../../../../util/util';

interface NotesFormProps {
  notes: string;
  closeModal: () => void;
  getIsModalOpen: boolean;
  id: number;
  o_id: string;
  od_id: string;
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>;
}

export default function NotesForm({
  notes,
  closeModal,
  getIsModalOpen,
  id,
  o_id,
  od_id,
  setList,
}: NotesFormProps) {
  const [getCurrentNote, setCurrentNote] = useState(notes);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const history = useHistory();

  async function formSubmit(e: any) {
    e.preventDefault();
    if (getCurrentNote !== null || getCurrentNote !== undefined)
      await UpdateNotes(id, o_id, od_id, getCurrentNote, setList);
    history.replace('/production');
    closeModal();
  }

  const UpdateNotesCB = useCallback(async () => {
    await UpdateNotes(id, o_id, od_id, getCurrentNote, setList);
  }, [id, o_id, od_id, getCurrentNote, setList]);

  function textareaOnChange() {
    setCurrentNote(() => {
      if (!notesRef.current) return notes;
      return notesRef.current.value;
    });
  }

  useEffect(() => {
    const keydown = async (e: any) => {
      if (e.key !== 'Enter' && getIsModalOpen === true) return;
      await UpdateNotesCB();
      history.replace('/production');
      closeModal();
    };

    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [getIsModalOpen, closeModal, UpdateNotesCB, history]);

  return (
    <>
      <form
        onSubmit={(e) => formSubmit(e)}
        className='form-group d-flex flex-column justify-content-center align-items-center'
      >
        <textarea
          ref={notesRef}
          cols={window.screen.width / 25}
          rows={window.screen.height / 100}
          className='form-control m-3 notes-form__textarea'
          value={getCurrentNote}
          onChange={textareaOnChange}
          autoFocus
        />
        <button
          className='btn btn-primary mt-3'
          type='submit'
          onMouseDown={btn_pd}
        >
          <strong>Submit</strong>
        </button>
      </form>
    </>
  );
}
