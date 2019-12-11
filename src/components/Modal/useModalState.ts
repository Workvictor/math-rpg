import { useState } from 'react';

interface IModalState {
  isOpen?: boolean;
}

export const useModalState = (initialState: IModalState = {}) => {
  const [isOpen, setIsOpen] = useState(initialState.isOpen);

  const onClose = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    openModal,
    onClose
  };
};
