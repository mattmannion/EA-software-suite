import { withRouter } from 'react-router-dom';
import {
  FormData,
  handleSubmitUpdate,
  handleChange,
} from '../../../handles/FormHandles';
import UserFormFields from './FormFields';
import { users_slug } from '../../../axios/axios_user';

function Update({ id, history, setData, closeModal }: any) {
  const [getFormData, setFormData] = FormData();

  return (
    <>
      <div className='container mt-4'>
        <form
          onSubmit={async (e) => {
            await handleSubmitUpdate(e, id, getFormData, setFormData, setData);
            closeModal();
            history.push(users_slug);
          }}
          className='form-group d-flex flex-column justify-content-center align-items-center'
        >
          <UserFormFields
            getFormData={getFormData}
            setFormData={setFormData}
            handleChange={(e: any) => handleChange(e, getFormData, setFormData)}
            createUser={false}
          />
        </form>
      </div>
    </>
  );
}

export default withRouter(Update);
