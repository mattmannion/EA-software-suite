import { useContext } from 'react';
import { OrderListIF } from '../../../../../../types/pages/production/pages/production';
import { ListCtx } from '../../../../../context/ProdContext';
import PLModal from '../modals/PLModal';
import ProdSearch from './ProdSearch';

interface ProdToolbarCtx {
  renderPageNumbers: JSX.Element[];
  FirstPage: () => void;
  PrevPage: () => void;
  NextPage: () => void;
  LastPage: () => void;
  pageNumber: number;
  getSearchTerm: string;
  SearchHandler: (e: any) => void;
  getList: OrderListIF[];
}

export default function Prod_Toolbar() {
  const {
    renderPageNumbers,
    FirstPage,
    PrevPage,
    NextPage,
    LastPage,
    pageNumber,
  }: ProdToolbarCtx = useContext(ListCtx);

  return (
    <div className='prod-toolbar'>
      <ProdSearch />
      <div className='prod-toolbar__container'>
        <PLModal />
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
