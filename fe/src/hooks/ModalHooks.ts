import { useHistory } from 'react-router';
import { useState } from 'react';

export const useModalHook = (path: string) => {
  const history = useHistory();
  const [getIsModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  function closeModal() {
    history.push(path);
    setIsModalOpen(false);
  }
  return { history, getIsModalOpen, setIsModalOpen, openModal, closeModal };
};
