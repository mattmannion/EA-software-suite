import FormFields from './FormFields';

export default function Form({
  getFormData,
  setFormData,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className='container mt-1'>
      <form
        onSubmit={handleSubmit}
        className='form-group d-flex flex-column justify-content-center align-items-center'
      >
        <FormFields
          getFormData={getFormData}
          setFormData={setFormData}
          handleChange={handleChange}
          createUser={true}
        />
      </form>
    </div>
  );
}
