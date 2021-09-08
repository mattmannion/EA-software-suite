import { useState } from 'react';

export const usePaginationInit = (
  maxPNL: number,
  itemsPP: number,
  current_data_set: any,
  current_search_term: any,
  current_search_results: any
) => {
  // start pagination
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getMaxPNL, setMaxPNL] = useState(maxPNL);
  const [getMinPNL, setMinPNL] = useState(0);

  const itemsPerPage = itemsPP;

  const indexOfLastItem = getCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // currentItems is the pagination entry point array
  let currentItems =
    current_search_term.length < 1
      ? current_data_set.slice(indexOfFirstItem, indexOfLastItem)
      : current_search_results.slice(indexOfFirstItem, indexOfLastItem);

  // dynamic page number calculated on current number of items
  const pageNumber =
    current_search_term.length < 1
      ? Math.ceil(current_data_set.length / itemsPerPage)
      : Math.ceil(current_search_results.length / itemsPerPage);

  const pageNumberLimit = 10;

  // for pagination buttons
  const clickHandler = (e: any) => setCurrentPage(Number(e.target.id));

  const FirstPage = () => {
    if (getCurrentPage === 1) return;
    setCurrentPage(1);

    setMaxPNL(pageNumberLimit);
    setMinPNL(0);
  };

  const PrevPage = () => {
    if (getCurrentPage === 1) return;
    setCurrentPage(getCurrentPage - 1);

    if ((getCurrentPage - 1) % pageNumberLimit === 0) {
      setMaxPNL(getMaxPNL - pageNumberLimit);
      setMinPNL(getMinPNL - pageNumberLimit);
    }
  };

  const NextPage = () => {
    if (getCurrentPage === pageNumber) return;
    setCurrentPage(getCurrentPage + 1);

    if (getCurrentPage + 1 > getMaxPNL) {
      setMaxPNL(getMaxPNL + pageNumberLimit);
      setMinPNL(getMinPNL + pageNumberLimit);
    }
  };

  const LastPage = () => {
    if (getCurrentPage === pageNumber) return;
    setCurrentPage(pageNumber);

    if (pageNumber > getMaxPNL) {
      setMaxPNL(Math.ceil(pageNumber));
      setMinPNL(pageNumber - pageNumberLimit);
    }
  };

  const pages: any[] = [];
  for (let i = 1; i <= Math.ceil(pageNumber); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number: number): JSX.Element => {
    if (number < getMaxPNL + 1 && number > getMinPNL)
      return (
        <li
          key={number}
          id={`${number}`}
          onClick={clickHandler}
          className={getCurrentPage === number ? 'prod-toolbar__active' : ''}
        >
          {number}
        </li>
      );
    else return <></>;
  });

  return {
    currentItems,
    pageNumber,
    renderPageNumbers,
    FirstPage,
    PrevPage,
    NextPage,
    LastPage,
  };
};
