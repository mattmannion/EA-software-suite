import React, { useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';
import { InitialFormDataIF } from '../../../handles/FormHandles';

interface UserFFProps {
  getFormData: InitialFormDataIF;
  setFormData: React.Dispatch<React.SetStateAction<InitialFormDataIF>>;
  handleChange: (e: any) => void;
  createUser: boolean;
}

export default function UserFormFields({
  getFormData,
  setFormData,
  handleChange,
  // created user toggles the required field (true, on/false, off)
  createUser,
}: UserFFProps) {
  const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'pallet', label: 'Pallet' },
    { value: 'tack', label: 'Tacker' },
    { value: 'assem', label: 'Assembler' },
  ];

  // creates state for select menu
  const [getOptions, setOptions] = useState<OptionTypeBase>({});

  return (
    <>
      <Select
        className='selection-box '
        placeholder={getOptions === null ? 'Permissions' : getOptions.label}
        onChange={(e) => {
          setOptions(e);
          setFormData({
            ...getFormData,
            permissions: e.value,
          });
        }}
        options={options}
        value={
          getOptions === null
            ? (getFormData.permissions = options[1].value)
            : (getFormData.permissions = getOptions.value)
        }
      />
      <label htmlFor='first_name' className='m-1'>
        <input
          type='text'
          name='first_name'
          value={getFormData.first_name}
          onChange={handleChange}
          placeholder='First Name'
          required={createUser}
        />
      </label>
      <label htmlFor='last_name' className='m-1'>
        <input
          type='text'
          name='last_name'
          value={getFormData.last_name}
          onChange={handleChange}
          placeholder='Last Name'
          required={createUser}
        />
      </label>
      <label htmlFor='email' className='m-1'>
        <input
          type='email'
          name='email'
          value={getFormData.email}
          onChange={handleChange}
          placeholder='Email'
          required={createUser}
        />
      </label>
      <label htmlFor='username' className='m-1'>
        <input
          type='text'
          name='username'
          autoComplete='username'
          value={getFormData.username}
          onChange={handleChange}
          placeholder='Username'
          required={createUser}
        />
      </label>
      <label htmlFor='password' className='m-1'>
        <input
          type='password'
          name='password'
          autoComplete='current-password'
          value={getFormData.password}
          onChange={handleChange}
          placeholder='Password'
          required={createUser}
        />
      </label>
      <button type='submit' className='btn btn-primary mt-2 mb-2'>
        submit
      </button>
    </>
  );
}
