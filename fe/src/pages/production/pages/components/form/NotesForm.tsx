import { useRef, useState, useContext } from 'react';
// import { useEffect, useCallback, useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UpdateNotes } from '../../../../../axios/axios_production';
import { ListCtx } from '../../../../../context/ProdContext';
import { btn_pd } from '../../../../../util/util';
import { setListIF } from '../../../ProductionHome';

interface NotesFormProps {
  notes: string;
  closeModal: () => void;
  id: number;
  // getIsModalOpen: boolean;
  // o_id: string;
  // od_id: string;
}

export default function NotesForm({
  notes,
  closeModal,
  id,
}: // getIsModalOpen,
// o_id,
// od_id,
NotesFormProps) {
  const { setList }: setListIF = useContext(ListCtx)!;
  const [getCurrentNote, setCurrentNote] = useState(notes);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);
  const history = useHistory();

  async function formSubmit(e: any) {
    e.preventDefault();
    if (getCurrentNote !== null || getCurrentNote !== undefined)
      await UpdateNotes(id, getCurrentNote, setList);
    history.replace('/production');
    closeModal();
  }

  function textareaOnChange() {
    setCurrentNote(() => {
      if (!notesRef.current) return notes;
      return notesRef.current.value;
    });
  }

  // const UpdateNotesCB = useCallback(async () => {
  //   await UpdateNotes(id, getCurrentNote, setList);
  // }, [id, o_id, od_id, getCurrentNote, setList]);

  // useEffect(() => {
  //   const keydown = async (e: any) => {
  //     if (e.key !== 'Enter' && getIsModalOpen === true) return;
  //     await UpdateNotesCB();
  //     history.replace('/production');
  //     closeModal();
  //   };

  //   window.addEventListener('keydown', keydown);
  //   return () => window.removeEventListener('keydown', keydown);
  // }, [getIsModalOpen, closeModal, UpdateNotesCB, history]);

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
