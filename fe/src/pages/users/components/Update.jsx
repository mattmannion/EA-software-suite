import { withRouter } from 'react-router-dom';
import {
  FormData,
  handleSubmitUpdate,
  handleChange,
} from '../../../handles/FormHandles';
import FormFields from './FormFields';
import { users_slug } from '../../../axios/axios_user.js';

function Update({ id, history, setData, closeModal }) {
  const [getFormData, setFormData] = FormData();

  return (
    <>
      <div className='container mt-4'>
        <form
          onSubmit={async e => {
            await handleSubmitUpdate(e, id, getFormData, setFormData, setData);
            closeModal();
            history.push(users_slug);
          }}
          className='form-group d-flex flex-column justify-content-center align-items-center'
        >
          <FormFields
            getFormData={getFormData}
            setFormData={setFormData}
            handleChange={e => handleChange(e, getFormData, setFormData)}
            createUser={false}
          />
        </form>
      </div>
    </>
  );
}

export default withRouter(Update);
