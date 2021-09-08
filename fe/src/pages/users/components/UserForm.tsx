import { FC } from 'react';
import UserFormFields from './FormFields';

const Form: FC<any> = ({
  getFormData,
  setFormData,
  handleChange,
  handleSubmit,
}: {
  getFormData: any;
  setFormData: any;
  handleChange: any;
  handleSubmit: any;
}) => {
  return (
    <div className='container mt-1'>
      <form
        onSubmit={handleSubmit}
        className='form-group d-flex flex-column justify-content-center align-items-center'
      >
        <UserFormFields
          getFormData={getFormData}
          setFormData={setFormData}
          handleChange={handleChange}
          createUser={true}
        />
      </form>
    </div>
  );
};
export default Form;
