import { useState } from 'react';
import ProdTable from './components/tables/ProdTable';
import ProdToolbar from './components/io/ProdToolbar';
import ProductionTabs from './components/io/ProductionTabs';
import { usePaginationInit } from '../../../hooks/PaginationHooks';
import { useFlushSearchArray, useSearchInit } from '../../../hooks/SearchHooks';
import { useFetchGateLogin_Prod } from '../../../hooks/LoginHooks';
import { OrderListIF } from '../../../../types/pages/production/pages/production';
import ListCtxProvider from '../../../context/ProdContext';

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
    getItemsPP,
    setItemsPP,
    getCurrentPage,
  } = usePaginationInit(10, 100, getList, getSearchTerm, getSearchResults);

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
    getItemsPP,
    setItemsPP,
    getCurrentPage,
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
    <ListCtxProvider value={ListState}>
      <ProdToolbar />
      <div className='d-flex justify-content-center align-items-center bg-primary text-white p-2 production__header'>
        <strong>Production</strong>
      </div>
      <ProdTable />
      <ProductionTabs />
    </ListCtxProvider>
  );
}
