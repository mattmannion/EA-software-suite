import { useRef, useState, useContext } from 'react';
import { UpdateNotes } from '../../../../../axios/axios_production';
import { ListCtx } from '../../../../../context/ProdContext';
import { btn_pd } from '../../../../../util/util';
import { setListIF } from '../../../ProductionHome';

interface NotesFormProps {
  notes: string;
  closeModal: () => void;
  id: number;
}

export default function NotesForm({ notes, closeModal, id }: NotesFormProps) {
  const { setList }: setListIF = useContext(ListCtx)!;
  const [getCurrentNote, setCurrentNote] = useState(notes);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  async function formSubmit(e: any) {
    e.preventDefault();
    if (getCurrentNote !== null || getCurrentNote !== undefined)
      await UpdateNotes(id, getCurrentNote, setList);
    closeModal();
  }

  function textareaOnChange() {
    setCurrentNote(() => {
      if (!notesRef.current) return notes;
      return notesRef.current.value.trim();
    });
  }

  return (
    <>
      <form
        onSubmit={formSubmit}
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
