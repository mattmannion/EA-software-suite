import React from 'react';
import { InitialFormDataIF } from '../../../handles/FormHandles';
import UserFormFields from './FormFields';

interface FormProps {
  getFormData: InitialFormDataIF;
  setFormData: React.Dispatch<React.SetStateAction<InitialFormDataIF>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
