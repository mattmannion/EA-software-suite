import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function CurrentUser() {
  const { getUser } = useContext(UserContext);

  return (
    <div className='d-flex flex-column mx-2'>
      <strong>current user: {getUser.username}</strong>
      <em>permissions: {getUser.permissions}</em>
    </div>
  );
}
