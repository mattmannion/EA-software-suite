import { useState } from 'react';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../axios/axios_user';

const InitialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  username: '',
  permissions: '',
  confirmed: true,
};

// fetch function for populating the table when needed
export const fetchData = async setData => {
  const { data } = await getUsers();
  setData(data.data);
};

// state definitions for the endpoint call data and form
export function EndPointData() {
  return useState([]);
}

export function FormData() {
  return useState(InitialFormData);
}

// grabs input field values and sets formData state
export const handleChange = (e, getFormData, setFormData) => {
  setFormData({
    ...getFormData,
    [e.target.name]: e.target.value.trim(),
  });
};

// form submit handle - create new record
export const handleSubmitCreate = async (
  e,
  getFormData,
  setFormData,
  setData
) => {
  e.preventDefault();

  await createUser({
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
  await fetchData(setData);
};

// update record by id
export const handleSubmitUpdate = async (
  e,
  id,
  getFormData,
  setFormData,
  setData
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
  fetchData(setData);
};

// delete record from db / list
export const handleDelete = async (id, setData) => {
  // delete request to backend server
  await deleteUser(id);

  // refreshes table
  fetchData(setData);
};
