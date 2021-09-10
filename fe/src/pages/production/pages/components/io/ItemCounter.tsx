import { useContext } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';

export default function ItemCounter() {
  const { currentItems, getSearchResults } = useContext(ListCtx);
  return (
    <>
      <strong className='px-4'>
        {currentItems.length}&nbsp;/{getSearchResults.length}
      </strong>
    </>
  );
}
