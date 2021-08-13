import { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductionTabs from '../components/ProductionTabs';
import {
  UserCheck,
  UserContext,
  CookieContext,
} from '../../../context/UserContext';
import { ProductionFetch } from '../logic/ProductionLogic';
import ProdToolbar from '../components/ProdToolbar';
import CompletedTable from '../components/tables/CompletedTable';

export default function Prod_Completed() {
  // all the hooks
  const history = useHistory();
  const { pathname } = useLocation();
  const { setUser } = useContext(UserContext);
  const cookies = useContext(CookieContext);
  const [getList, setList] = useState([]);
  const [getFetchGate, setFetchGate] = useState(false);

  // start search bar
  const [getSearchTerm, setSearchTerm] = useState('');
  const [getSearchResults, setSearchResults] = useState([]);

  const SearchHandler = getSearchTerm => {
    setSearchTerm(getSearchTerm);
    if (getSearchTerm !== '') {
      const filteredList = getList.filter(list => {
        return Object.values(list)
          .join(' ')
          .toLowerCase()
          .includes(getSearchTerm.toLowerCase());
      });
      setSearchResults(filteredList);
    } else {
      setSearchResults(getList);
    }
  };

  // start pagination
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getMaxPNL, setMaxPNL] = useState(10);
  const [getMinPNL, setMinPNL] = useState(0);

  const itemsPerPage = 15;

  const indexOfLastItem = getCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    getSearchTerm.length < 1
      ? getList.slice(indexOfFirstItem, indexOfLastItem)
      : getSearchResults.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumber =
    getSearchTerm.length < 1
      ? Math.ceil(getList.length / itemsPerPage)
      : Math.ceil(getSearchResults.length / itemsPerPage);

  const pageNumberLimit = 10;

  const clickHandler = e => setCurrentPage(Number(e.target.id));

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

  const pages = [];
  for (let i = 1; i <= Math.ceil(pageNumber); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map(number => {
    if (number < getMaxPNL + 1 && number > getMinPNL)
      return (
        <li
          key={number}
          id={number}
          onClick={clickHandler}
          className={getCurrentPage === number ? 'prod-toolbar__active' : null}
        >
          {number}
        </li>
      );
    else return null;
  });

  // fetch data and check user
  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  // checks if there is a user logged before loading data
  useEffect(() => {
    if (getFetchGate) ProductionFetch('/production/completed', setList);
  }, [getFetchGate, pathname]);

  // placeholder for list while its loading
  if (getList.length === 0)
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
      />
      <strong className='d-flex justify-content-center align-items-center bg-success text-white p-2'>
        Completed Orders
      </strong>
      <CompletedTable currentItems={currentItems} />
      <ProductionTabs />
    </>
  );
}
