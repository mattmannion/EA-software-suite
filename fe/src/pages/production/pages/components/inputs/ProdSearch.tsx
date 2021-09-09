import { useContext, useRef } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';

interface ProdSearchCtx {
  getSearchTerm: string;
  SearchHandler: (e: any) => void;
  FirstPage: () => void;
}

export default function Prod_Search() {
  const { getSearchTerm, SearchHandler, FirstPage }: ProdSearchCtx =
    useContext(ListCtx);

  const inputElement = useRef<HTMLInputElement | null>(null);
  const SearchKeyword = () => {
    if (!inputElement.current) return;
    SearchHandler(inputElement.current.value);
    FirstPage();
  };

  return (
    <>
      <label htmlFor='searchbar' className='prod-search'>
        <input
          ref={inputElement}
          name='searchbar'
          type='search'
          className='prod-search__searchbar'
          placeholder='Search here...'
          value={getSearchTerm}
          onChange={SearchKeyword}
          autoFocus
        />
      </label>
    </>
  );
}
