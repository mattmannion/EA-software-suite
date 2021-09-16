import React, { useState } from 'react';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../axios/axios_user';

export interface InitialFormDataIF {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  permissions: string;
  confirmed: boolean;
}

const InitialFormData: InitialFormDataIF = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  username: '',
  permissions: '',
  confirmed: true,
};

// fetch function for populating the table when needed
export const fetchUsers = async (
  setData: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>
) => {
  const { data } = await getUsers();
  setData(data.data);
};

// state definitions for the endpoint call data and form
export function EndPointData() {
  return useState<InitialFormDataIF[]>([]);
}

export function FormData() {
  return useState<InitialFormDataIF>(InitialFormData);
}

// grabs input field values and sets formData state
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  getFormData: InitialFormDataIF,
  setFormData: React.Dispatch<React.SetStateAction<InitialFormDataIF>>
) => {
  setFormData({
    ...getFormData,
    [e.target.name]: e.target.value.trim(),
  });
};

// form submit handle - create new record
export function handleSubmitCreate(
  e: React.FormEvent<HTMLFormElement>,
  getFormData: InitialFormDataIF,
  setFormData: React.Dispatch<React.SetStateAction<InitialFormDataIF>>,
  setData: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>
) {
  e.preventDefault();

  createUser({
    first_name: getFormData.first_name,
    last_name: getFormData.last_name,
    email: getFormData.email,
    password: getFormData.password,
    username: getFormData.username,
    permissions: getFormData.permissions,
    confirmed: getFormData.confirmed,
  });

  // resets inputs
  setFormData(InitialFormData);

  // refreshes table
  fetchUsers(setData);
}

// update record by id
export const handleSubmitUpdate = async (
  e: React.FormEvent<HTMLFormElement>,
  id: string,
  getFormData: InitialFormDataIF,
  setFormData: React.Dispatch<React.SetStateAction<InitialFormDataIF>>,
  setData: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>
) => {
  e.preventDefault();

  // request and set form data
  let { data } = await getUsers();

  const {
    first_name,
    last_name,
    email,
    password,
    username,
    permissions,
    confirmed,
  } = data.data;

  await updateUser(id, {
    first_name: getFormData.first_name || first_name,
    last_name: getFormData.last_name || last_name,
    email: getFormData.email || email,
    password: getFormData.password || password,
    username: getFormData.username || username,
    permissions: getFormData.permissions || permissions,
    confirmed: getFormData.confirmed || confirmed,
  });

  // resets inputs
  setFormData(InitialFormData);

  // refetches records
  fetchUsers(setData);
};

// delete record from db / list
export function handleDelete(
  id: number,
  setData: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>
) {
  // delete request to backend server
  deleteUser(id);

  // refreshes table
  fetchUsers(setData);
}
