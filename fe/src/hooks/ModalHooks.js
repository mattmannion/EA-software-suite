import { useHistory } from 'react-router';
import { useState } from 'react';

export const useModalHook = path => {
  const history = useHistory();
  const [getIsModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  function closeModal() {
    setIsModalOpen(false);
    history.push(path);
  }
  return { history, getIsModalOpen, setIsModalOpen, openModal, closeModal };
};
