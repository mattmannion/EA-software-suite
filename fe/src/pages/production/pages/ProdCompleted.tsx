import { useState } from 'react';
import ProdToolbar from '../components/inputs/ProdToolbar';
import ProductionTabs from '../components/inputs/ProductionTabs';
import CompletedTable from '../components/tables/CompletedTable';
import { usePaginationInit } from '../../../hooks/PaginationHooks';
import { useSearchArrayFlush, useSearchInit } from '../../../hooks/SearchHooks';
import { useFetchGateLogin_Prod } from '../../../hooks/LoginHooks';
import { OrderListIF } from '../../../../types/pages/production/pages/production';

export default function Prod_Completed() {
  const [getList, setList] = useState<OrderListIF[]>([]);

  useFetchGateLogin_Prod('/production/completed', setList);

  const { getSearchTerm, getSearchResults, SearchHandler } =
    useSearchInit(getList);

  useSearchArrayFlush(getList, getSearchTerm, SearchHandler);

  const {
    currentItems,
    pageNumber,
    renderPageNumbers,
    FirstPage,
    PrevPage,
    NextPage,
    LastPage,
  } = usePaginationInit(10, 15, getList, getSearchTerm, getSearchResults);

  // placeholder for list while its loading
  if (getList.length === 0)
    return (
      <>
        <strong className='d-flex justify-content-center align-items-center bg-success text-white p-2'>
          Completed Orders
        </strong>
        <strong className='d-flex justify-content-center align-items-center'>
          Loading...
        </strong>
        <ProductionTabs />
      </>
    );

  return (
    <>
      <ProdToolbar
        renderPageNumbers={renderPageNumbers}
        FirstPage={FirstPage}
        PrevPage={PrevPage}
        NextPage={NextPage}
        LastPage={LastPage}
        pageNumber={pageNumber}
        getSearchTerm={getSearchTerm}
        SearchHandler={SearchHandler}
        getList={getList}
      />
      <strong className='d-flex justify-content-center align-items-center bg-success text-white p-2'>
        Completed Orders
      </strong>
      <CompletedTable currentItems={currentItems} setList={setList} />
      <ProductionTabs />
    </>
  );
}
