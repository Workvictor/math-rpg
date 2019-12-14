import { useState } from 'react';

export const useModalState = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return {
    modalIsOpen,
    openModal,
    onClose
  };
};
