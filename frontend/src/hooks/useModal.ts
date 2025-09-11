import { useContext } from 'react';
import ModalContext from './context/ModalContext';

/**
 * @description Custom hook for accessing modal-related context.
 * It provides the modal context value.
 * @returns The modal context.
 * @throws Will throw an error if not used within a ModalProvider.
 */
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      'useModal must be used within a ModalContext'
    );
  }
  return context;
};
