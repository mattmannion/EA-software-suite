import { useRef } from 'react';

interface ProdSearchProps {
  getSearchTerm: string;
  SearchHandler: (e: any) => void;
  FirstPage: () => void;
}

export default function Prod_Search({
  getSearchTerm,
  SearchHandler,
  FirstPage,
}: ProdSearchProps) {
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
