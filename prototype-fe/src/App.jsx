import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// axios setup
const path = 'http://localhost:7878';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// Init form state object
const formData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmed: true,
};

export default function App() {
  const [getData, setData] = useState([]);
  const [getFormData, setFormData] = useState(formData);

  // Fetches and loads data into table
  const fetchData = async () => {
    const { data } = await axios.get(path);
    setData(data.data);
    console.log('data loaded');
  };

  // Loads data into table from db on page view
  useEffect(() => {
    fetchData();
  }, []);

  // -- FORM START -- //

  // db insert from form
  const handleSubmit = async e => {
    e.preventDefault();

    // post request to backend server
    await axios.post(path, {
      headers,
      first_name: getFormData.first_name,
      last_name: getFormData.last_name,
      email: getFormData.email,
      password: getFormData.password,
      confirmed: getFormData.confirmed,
    });

    // resets inputs
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmed: true,
    });

    // refreshes table
    await fetchData();
  };

  // grabs input field values and sets formData state
  const handleChange = e => {
    setFormData({
      ...getFormData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // delete item from db / list
  const handleDelete = async id => {
    // delete request to backend server
    await axios.delete(`${path}/${id}`);

    // refreshes table
    await fetchData();
  };

  // -- FORM START -- //

  return (
    <>
      <div className='container mt-4'>
        <form onSubmit={e => handleSubmit(e)} className='form-group'>
          <label htmlFor='first_name'>
            <input
              type='text'
              name='first_name'
              value={getFormData.first_name}
              onChange={handleChange}
              placeholder='First Name'
            />
          </label>
          <label htmlFor='last_name'>
            <input
              type='text'
              name='last_name'
              value={getFormData.last_name}
              onChange={handleChange}
              placeholder='Last Name'
            />
          </label>
          <label htmlFor='email'>
            <input
              type='text'
              name='email'
              value={getFormData.email}
              onChange={handleChange}
              placeholder='Email'
            />
          </label>
          <label htmlFor='password'>
            <input
              type='text'
              name='password'
              value={getFormData.password}
              onChange={handleChange}
              placeholder='Password'
            />
          </label>
          <div>
            <button type='submit' className='btn btn-primary mt-2 mb-2'>
              submit
            </button>
          </div>
        </form>
      </div>
      <table className='table table-striped table-dark table-hover'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Email</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {getData.map(data => {
            return (
              <tr key={data.id}>
                <th scope='row'>{data.id}</th>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>
                  <Link
                    to='/update'
                    className='btn btn-warning mt-2 mb-2'
                    id={data.id}
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    className='btn btn-danger mt-2 mb-2'
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
