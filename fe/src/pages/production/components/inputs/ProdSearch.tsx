import { FC, useRef } from 'react';

interface ProdSearchProps {
  getSearchTerm: any;
  SearchHandler: any;
  FirstPage: any;
}

const Prod_Search: FC<ProdSearchProps> = ({
  getSearchTerm,
  SearchHandler,
  FirstPage,
}) => {
  const inputElement: any = useRef('');

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
};

export default Prod_Search;
