import { useState } from 'react';
import ProdTable from './components/tables/ProdTable';
import ProdToolbar from './components/inputs/ProdToolbar';
import ProductionTabs from './components/inputs/ProductionTabs';
import { usePaginationInit } from '../../../hooks/PaginationHooks';
import { useFlushSearchArray, useSearchInit } from '../../../hooks/SearchHooks';
import { useFetchGateLogin_Prod } from '../../../hooks/LoginHooks';
import { OrderListIF } from '../../../../types/pages/production/pages/production';
import { ListCtx } from '../../../context/ProdContext';

export default function Production() {
  const [getList, setList] = useState<OrderListIF[]>([]);

  useFetchGateLogin_Prod('/production', setList);

  const { getSearchTerm, getSearchResults, SearchHandler } =
    useSearchInit(getList);

  useFlushSearchArray(getList, getSearchTerm, SearchHandler);

  const {
    currentItems,
    pageNumber,
    renderPageNumbers,
    FirstPage,
    PrevPage,
    NextPage,
    LastPage,
  } = usePaginationInit(10, 20, getList, getSearchTerm, getSearchResults);

  // Production Context
  const ListState = {
    getList,
    setList,
    getSearchTerm,
    getSearchResults,
    SearchHandler,
    currentItems,
    pageNumber,
    renderPageNumbers,
    FirstPage,
    PrevPage,
    NextPage,
    LastPage,
  };

  // placeholder for list while its loading
  if (getList.length === 0)
    return (
      <>
        <strong className='d-flex justify-content-center align-items-center bg-primary text-white p-2'>
          Production
        </strong>
        <strong className='d-flex justify-content-center align-items-center'>
          Loading...
        </strong>
        <ProductionTabs />
      </>
    );

  return (
    <ListCtx.Provider value={ListState}>
      <ProdToolbar />
      <div className='d-flex justify-content-center align-items-center bg-primary text-white p-2 production__header'>
        <strong>Production</strong>
      </div>
      <ProdTable currentItems={currentItems} />
      <ProductionTabs />
    </ListCtx.Provider>
  );
}
