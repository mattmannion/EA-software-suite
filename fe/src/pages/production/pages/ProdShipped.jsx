import { useState } from 'react';
import ProductionTabs from '../components/ProductionTabs';
import ProdToolbar from '../components/ProdToolbar';
import ShippedTable from '../components/tables/ShippedTable';
import { usePaginationInit } from '../../../hooks/PaginationHooks';
import { useSearchInit } from '../../../hooks/SearchHooks';
import { useFetchGateLogin_Prod } from '../../../hooks/LoginHooks';

export default function Prod_Shipped() {
  const [getList, setList] = useState([]);

  const { getSearchTerm, getSearchResults, SearchHandler } =
    useSearchInit(getList);

  const {
    currentItems,
    pageNumber,
    renderPageNumbers,
    FirstPage,
    PrevPage,
    NextPage,
    LastPage,
  } = usePaginationInit(10, 30, getList, getSearchTerm, getSearchResults);

  useFetchGateLogin_Prod('/production/shipped', setList);

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
      />
      <strong className='d-flex justify-content-center align-items-center bg-warning p-2'>
        Shipped Orders
      </strong>
      <ShippedTable currentItems={currentItems} />
      <ProductionTabs />
    </>
  );
}
