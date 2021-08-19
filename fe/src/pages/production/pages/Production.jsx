import { useState } from 'react';
import ProductionTabs from '../components/ProductionTabs';
import ProdTable from '../components/tables/ProdTable';
import ProdToolbar from '../components/ProdToolbar';
import { usePaginationInit } from '../../../hooks/PaginationHooks';
import { useSearchArrayFlush, useSearchInit } from '../../../hooks/SearchHooks';
import { useFetchGateLogin_Prod } from '../../../hooks/LoginHooks';

export default function Production() {
  const [getList, setList] = useState([]);

  useFetchGateLogin_Prod('/production', setList);

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
  } = usePaginationInit(10, 20, getList, getSearchTerm, getSearchResults);

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
      <div className='d-flex justify-content-center align-items-center bg-primary text-white p-2'>
        <strong>Production</strong>
      </div>
      <ProdTable currentItems={currentItems} setList={setList} />
      <ProductionTabs />
    </>
  );
}
