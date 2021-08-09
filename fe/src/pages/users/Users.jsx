import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  EndPointData,
  FormData,
  handleSubmitCreate,
  handleChange,
  handleDelete,
  fetchData,
} from '../../handles/FormHandles';
import UserForm from './components/UserForm';
import Table from './components/Table';
import {
  CookieContext,
  UserCheck,
  UserContext,
} from '../../context/UserContext';
import NavBar from '../../components/NavBar';

function Home() {
  // Context for current user
  const history = useHistory();
  const { pathname } = useLocation();

  const { setUser } = useContext(UserContext);

  const cookies = useContext(CookieContext);

  let [getFetchGate, setFetchGate] = useState(false);

  useEffect(
    () => setFetchGate(UserCheck(cookies, pathname, history, setUser)),
    // eslint-disable-next-line
    []
  );

  // set current state for users
  const [getData, setData] = EndPointData();

  const [getFormData, setFormData] = FormData();

  // Loads data into table from db on page load
  useEffect(() => {
    if (getFetchGate) fetchData(setData);
  }, [getFetchGate, setData]);

  return (
    <>
      <NavBar />
      <strong className='d-flex justify-content-center mt-4'>
        Create User:
      </strong>
      <UserForm
        getFormData={getFormData}
        setFormData={setFormData}
        handleSubmit={e =>
          handleSubmitCreate(e, getFormData, setFormData, setData)
        }
        handleChange={e => handleChange(e, getFormData, setFormData)}
      />
      <Table
        getData={getData}
        setData={setData}
        handleDelete={id => handleDelete(id, setData)}
      />
    </>
  );
}

export default withRouter(Home);
