import { useContext } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';

export default function ItemCounter() {
  const { currentItems, getSearchResults, getCurrentPage, getItemsPP } =
    useContext(ListCtx);

  const calcCurrentItems: number =
    currentItems.length !== getItemsPP
      ? getSearchResults.length
      : currentItems.length * getCurrentPage;
  return (
    <>
      <strong className='px-4'>
        {calcCurrentItems}&nbsp;/{getSearchResults.length}
      </strong>
    </>
  );
}
