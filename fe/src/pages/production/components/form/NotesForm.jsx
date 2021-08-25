import { useEffect, useRef, useState, useCallback } from 'react';
import { UpdateNotes } from '../../../../axios/axios_production';
import { btn_pd } from '../../../../util/util';

export default function NotesForm({
  notes,
  closeModal,
  getIsModalOpen,
  id,
  o_id,
  od_id,
  setList,
}) {
  const [getCurrentNote, setCurrentNote] = useState(notes);
  const notesRef = useRef();

  async function formSubmit(e) {
    e.preventDefault();
    if (getCurrentNote !== null || getCurrentNote !== undefined)
      await UpdateNotes(id, o_id, od_id, getCurrentNote, setList);
    closeModal();
  }

  const UpdateNotesCB = useCallback(async () => {
    await UpdateNotes(id, o_id, od_id, getCurrentNote, setList);
  }, [id, o_id, od_id, getCurrentNote, setList]);

  function textareaOnChange() {
    setCurrentNote(() => notesRef.current.value);
  }

  useEffect(() => {
    const keydown = async e => {
      if (e.key !== 'Enter' && getIsModalOpen === true) return;
      await UpdateNotesCB();
      closeModal();
    };

    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [getIsModalOpen, closeModal, UpdateNotesCB]);

  return (
    <>
      <form
        onSubmit={e => formSubmit(e)}
        className='form-group d-flex flex-column justify-content-center align-items-center'
      >
        <textarea
          ref={notesRef}
          cols={window.screen.width / 25}
          rows={window.screen.height / 100}
          className='form-control m-3 notes-form__textarea'
          value={getCurrentNote}
          onChange={textareaOnChange}
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
