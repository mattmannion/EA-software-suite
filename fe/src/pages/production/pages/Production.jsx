import { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductionTabs from '../components/ProductionTabs';
import {
  UserCheck,
  UserContext,
  CookieContext,
} from '../../../context/UserContext';
import { ProductionFetch } from '../logic/Production';
import ProdTable from '../components/ProdTable';
import ProdToolbar from '../components/ProdToolbar';

export default function Production() {
  // all the hooks
  const history = useHistory();
  const { pathname } = useLocation();
  const { setUser } = useContext(UserContext);
  const cookies = useContext(CookieContext);
  const [getList, setList] = useState([]);
  const [getFetchGate, setFetchGate] = useState(false);
  // const [getUpdatedList, setUpdateList] = useState([]);
  // const [getKeyword, setKeyword] = useState('');

  // pagination start
  const [getCurrentPage, setCurrentPage] = useState(1);
  const [getMaxPNL, setMaxPNL] = useState(10);
  const [getMinPNL, setMinPNL] = useState(0);

  const itemsPerPage = 15;

  const indexOfLastItem = getCurrentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumber = Math.ceil(getList.length / itemsPerPage);

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

  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  // checks if there is a user logged before loading data
  useEffect(() => {
    if (getFetchGate) ProductionFetch('/production', setList);
  }, [getFetchGate, pathname]);

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
      />
      <div className='d-flex justify-content-center align-items-center bg-primary text-white p-2'>
        <strong>Production</strong>
      </div>
      <ProdTable getList={currentItems} />
      <ProductionTabs />
    </>
  );
}
