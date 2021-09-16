import { useContext, useRef, useState } from 'react';
import { OrderListIF } from '../../../../../../types/pages/production/pages/production';
import {
  FetchList,
  InsertOrderById,
} from '../../../../../axios/axios_production';
import { ListCtx } from '../../../../../context/ProdContext';

const path = '/production';
const input_min = 100000;
const input_max = 999999;

async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>,
  closeModal: () => void
) {
  e.preventDefault();
  await InsertOrderById(id);
  FetchList(path, setList);
  closeModal();
}

export default function AddItemForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [getId, setId] = useState<number>(0);
  const { setList } = useContext(ListCtx);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange() {
    if (!inputRef.current) return;
    let input = +inputRef.current.value;
    if (input < input_min || input > input_max) return;
    setId(input);
  }

  return (
    <>
      <form
        className='d-flex flex-column justify-content-center align-items-center production__add-item-form'
        action='post'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handleSubmit(e, getId, setList, closeModal)
        }
      >
        <label htmlFor='id' className='m-2'>
          <input
            ref={inputRef}
            className='text-center'
            type='number'
            min={input_min}
            max={input_max}
            id='id'
            placeholder='Order ID'
            onChange={handleChange}
          />
        </label>
        <button type='submit' className='btn btn-primary'>
          submit
        </button>
      </form>
    </>
  );
}
