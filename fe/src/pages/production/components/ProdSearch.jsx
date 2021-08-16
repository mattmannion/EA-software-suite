import { useRef } from 'react';

export default function Prod_Search({
  getSearchTerm,
  SearchHandler,
  FirstPage,
}) {
  const inputElement = useRef('');

  const SearchKeyword = () => {
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
