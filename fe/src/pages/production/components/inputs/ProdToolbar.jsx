import PLModal from '../modals/PLModal';
import ProdSearch from './ProdSearch';

export default function Prod_Toolbar({
  renderPageNumbers,
  FirstPage,
  PrevPage,
  NextPage,
  LastPage,
  pageNumber,
  getSearchResults,
  getSearchTerm,
  SearchHandler,
  getList,
}) {
  return (
    <div className='prod-toolbar'>
      <ProdSearch
        getSearchTerm={getSearchTerm}
        SearchHandler={SearchHandler}
        FirstPage={FirstPage}
      />
      <div className='prod-toolbar__container'>
        <PLModal
          getSearchResults={getSearchResults}
          getList={getList}
          SearchHandler={SearchHandler}
        />
        <ul className='prod-toolbar__page-numbers'>
          <li onClick={FirstPage}>First</li>
          <li onClick={PrevPage}>Prev</li>
          {renderPageNumbers}
          <li className='prod-toolbar__page-count'>
            <strong>/{pageNumber}</strong>
          </li>
          <li onClick={NextPage}>Next</li>
          <li onClick={LastPage}>Last</li>
        </ul>
      </div>
    </div>
  );
}
