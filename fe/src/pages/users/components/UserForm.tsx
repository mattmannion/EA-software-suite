import { InitialFormDataIF } from '../../../handles/FormHandles';
import UserFormFields from './FormFields';

interface FormProps {
  getFormData: InitialFormDataIF;
  setFormData: React.Dispatch<React.SetStateAction<InitialFormDataIF>>;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}
export default function Form({
  getFormData,
  setFormData,
  handleChange,
  handleSubmit,
}: FormProps) {
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
}
