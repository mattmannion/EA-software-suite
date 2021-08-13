import ProdSearch from './ProdSearch';

export default function Prod_Toolbar({
  renderPageNumbers,
  FirstPage,
  PrevPage,
  NextPage,
  LastPage,
}) {
  return (
    <div className='prod-toolbar'>
      <ProdSearch />
      <ul className='prod-toolbar__page-numbers'>
        <li onClick={FirstPage}>First</li>
        <li onClick={PrevPage}>Prev</li>
        {renderPageNumbers}
        <li onClick={NextPage}>Next</li>
        <li onClick={LastPage}>Last</li>
      </ul>
    </div>
  );
}
