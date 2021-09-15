import { useState } from 'react';
import ProductionTabs from './components/io/ProductionTabs';
import ProdToolbar from './components/io/ProdToolbar';
import ShippedTable from './components/tables/ShippedTable';
import { usePaginationInit } from '../../../hooks/PaginationHooks';
import { useFlushSearchArray, useSearchInit } from '../../../hooks/SearchHooks';
import { useFetchGateLogin_Prod } from '../../../hooks/LoginHooks';
import { OrderListIF } from '../../../../types/pages/production/pages/production';
import ListCtxProvider from '../../../context/ProdContext';

export default function Prod_Shipped() {
  const [getList, setList] = useState<OrderListIF[]>([]);

  useFetchGateLogin_Prod('/production/shipped', setList);

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

  // Shipping Context
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
        <strong className='d-flex justify-content-center align-items-center bg-warning p-2'>
          Shipped Orders
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
      <strong className='d-flex justify-content-center align-items-center bg-warning p-2'>
        Shipped Orders
      </strong>
      <ShippedTable currentItems={currentItems} />
      <ProductionTabs />
    </ListCtxProvider>
  );
}
