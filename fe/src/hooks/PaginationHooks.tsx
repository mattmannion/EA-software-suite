import React, { useState } from 'react';
import { OrderListIF } from '../../types/pages/production/pages/production';

export const usePaginationInit = (
  maxPNL: number,
  itemsPP: number,
  getList: OrderListIF[],
  current_search_term: string,
  current_search_results: OrderListIF[]
) => {
  // start pagination
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getMaxPNL, setMaxPNL] = useState(maxPNL);
  const [getMinPNL, setMinPNL] = useState(0);
  const [getItemsPP, setItemsPP] = useState<number>(itemsPP);

  const indexOfLastItem = getCurrentPage * getItemsPP;
  const indexOfFirstItem = indexOfLastItem - getItemsPP;
  // currentItems is the pagination entry point array
  let currentItems =
    current_search_term.length < 1
      ? getList.slice(indexOfFirstItem, indexOfLastItem)
      : current_search_results.slice(indexOfFirstItem, indexOfLastItem);

  // dynamic page number calculated on current number of items
  const pageNumber =
    current_search_term.length < 1
      ? Math.ceil(getList.length / getItemsPP)
      : Math.ceil(current_search_results.length / getItemsPP);

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

  const renderPageNumbers: JSX.Element[] = pages.map(
    (number: number, i: number): JSX.Element => {
      if (number < getMaxPNL + 1 && number > getMinPNL)
        return (
          <li
            key={i}
            id={`${number}`}
            onClick={clickHandler}
            className={getCurrentPage === number ? 'prod-toolbar__active' : ''}
          >
            {number}
          </li>
        );
      else return <React.Fragment key={i}></React.Fragment>;
    }
  );

  return {
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
};
