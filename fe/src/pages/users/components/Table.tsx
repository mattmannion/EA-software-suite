import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { modalStyles, users_slug } from '../../../util/modal_util';
import Update from './Update';
import Delete from './Delete';
import { InitialFormDataIF } from '../../../handles/FormHandles';

interface TableProps {
  getData: InitialFormDataIF[];
  setData: React.Dispatch<React.SetStateAction<InitialFormDataIF[]>>;
}

export default function Table({ getData, setData }: TableProps) {
  const history = useHistory<any>();

  const { id }: any = useParams();

  const [getIsUpdateOpen, setIsUpdateOpen] = useState(false);

  const openUpdateModal = () => setIsUpdateOpen(true);

  function closeUpdateModal() {
    setIsUpdateOpen(false);
    history.push(users_slug);
  }

  const [getIsDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteOpen(true);

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    history.push(users_slug);
  };

  return (
    <table className='table table-striped table-dark table-hover '>
      <thead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>First Name</th>
          <th scope='col'>Last Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Username</th>
          <th scope='col'>Permissions</th>
          <th scope='col'></th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {getData.map((data: any) => {
          return (
            <tr key={data.id}>
              <th scope='row'>{data.id}</th>
              <td>{data.first_name}</td>
              <td>{data.last_name}</td>
              <td>{data.email}</td>
              <td>{data.username}</td>
              <td>{data.permissions}</td>
              <td>
                <Link
                  to={`${users_slug}/${data.id}`}
                  className='btn btn-warning mt-2 mb-2'
                  onClick={openUpdateModal}
                >
                  Update
                </Link>
                <Modal
                  isOpen={getIsUpdateOpen}
                  onRequestClose={closeUpdateModal}
                  style={modalStyles}
                >
                  <div className='d-flex'>
                    <h2 className='text-center'>Update User &nbsp;</h2>
                    <button
                      className='btn btn-danger'
                      onClick={closeUpdateModal}
                    >
                      &#x2715;
                    </button>
                  </div>
                  <Update
                    getData={getData}
                    setData={setData}
                    closeModal={closeUpdateModal}
                    id={id}
                  />
                </Modal>
              </td>
              <td>
                <Link
                  to={`${users_slug}/${data.id}`}
                  className='btn btn-danger mt-2 mb-2'
                  onClick={openDeleteModal}
                  id={id}
                >
                  Delete
                </Link>
                <Modal
                  isOpen={getIsDeleteOpen}
                  onRequestClose={closeDeleteModal}
                  style={modalStyles}
                >
                  <div className='d-flex justify-content-center'>
                    <h2 className='text-center'>Delete User &nbsp;</h2>
                    <button
                      className='btn btn-danger'
                      onClick={closeDeleteModal}
                    >
                      &#x2715;
                    </button>
                  </div>
                  <div className='d-flex flex-column justify-content-center align-items-center'>
                    <strong className='m-2'>Warning:</strong>
                    <p>This action cannot be reversed</p>
                  </div>
                  <Delete
                    setData={setData}
                    closeModal={closeDeleteModal}
                    id={id}
                    history={history}
                  />
                </Modal>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
