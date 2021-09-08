import {
  EndPointData,
  FormData,
  handleSubmitCreate,
  handleChange,
} from '../../handles/FormHandles';
import UserForm from './components/UserForm';
import Table from './components/Table';
import NavBar from '../../components/NavBar';
import { useFetchGateLogin_Users } from '../../hooks/LoginHooks';

export default function Home() {
  const [getData, setData] = EndPointData();

  const [getFormData, setFormData] = FormData();

  useFetchGateLogin_Users(setData);

  return (
    <>
      <NavBar />
      <strong className='d-flex justify-content-center mt-4'>
        Create User:
      </strong>
      <UserForm
        getFormData={getFormData}
        setFormData={setFormData}
        handleSubmit={(e: any) =>
          handleSubmitCreate(e, getFormData, setFormData, setData)
        }
        handleChange={(e: any) => handleChange(e, getFormData, setFormData)}
      />
      <Table getData={getData} setData={setData} />
    </>
  );
}
