import { useRef, useState } from 'react';
import { UpdateNotes } from '../../../../axios/axios_production';

export default function NotesForm({ notes, closeModal, o_id, od_id, setList }) {
  const [getCurrentNote, setCurrentNote] = useState(notes);
  const notesRef = useRef();

  async function formSubmit(e) {
    e.preventDefault();
    if (getCurrentNote !== null || getCurrentNote !== undefined)
      await UpdateNotes(o_id, od_id, getCurrentNote, setList);
    closeModal();
  }

  function textareaOnChange() {
    setCurrentNote(() => notesRef.current.value);
  }
  return (
    <>
      <form
        onSubmit={e => formSubmit(e)}
        className='form-group d-flex flex-column justify-content-center align-items-center'
      >
        <textarea
          ref={notesRef}
          name=''
          id=''
          cols={window.screen.width / 25}
          rows={window.screen.height / 100}
          className='form-control m-3 notes-form__textarea'
          value={getCurrentNote}
          onChange={textareaOnChange}
        />
        <button className='btn btn-primary mt-3' type='submit'>
          <strong>Submit</strong>
        </button>
      </form>
    </>
  );
}
