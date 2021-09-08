import { FC } from 'react';
import { OrderList } from '../../../../../types/pages/production/pages/production';
import PLModal from '../modals/PLModal';
import ProdSearch from './ProdSearch';

interface ProdToolbarProps {
  renderPageNumbers: any;
  FirstPage: any;
  PrevPage: any;
  NextPage: any;
  LastPage: any;
  pageNumber: number;
  getSearchTerm: any;
  SearchHandler: any;
  getList: OrderList[];
}

const Prod_Toolbar: FC<ProdToolbarProps> = ({
  renderPageNumbers,
  FirstPage,
  PrevPage,
  NextPage,
  LastPage,
  pageNumber,
  getSearchTerm,
  SearchHandler,
  getList,
}) => {
  return (
    <div className='prod-toolbar'>
      <ProdSearch
        getSearchTerm={getSearchTerm}
        SearchHandler={SearchHandler}
        FirstPage={FirstPage}
      />
      <div className='prod-toolbar__container'>
        <PLModal getList={getList} SearchHandler={SearchHandler} />
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
};

export default Prod_Toolbar;
