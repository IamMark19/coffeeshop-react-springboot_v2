import { Dialog } from '@headlessui/react';
import { classNames } from '@/utils/helper';
import BlankModal from './BlankModal';

/**
 * @description The props for the BaseModal component.
 * @param {boolean} show If true, the modal will be shown.
 * @param {() => void} onClose A function to be called when the modal is closed.
 * @param {React.ReactNode} children The content to be displayed inside the modal.
 * @param {boolean} fullScreen If true, the modal will be full screen on mobile.
 */
interface BaseModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
}

/**
 * @description A base modal component.
 * @param {BaseModalProps} props The props for the component.
 * @returns {React.ReactElement} The modal component.
 */
export default function BaseModal({
  show,
  onClose,
  children,
  fullScreen = false,
}: BaseModalProps) {
  return (
    <BlankModal show={show} onClose={onClose}>
      <Dialog.Panel
        className={classNames(
          'w-full transform bg-gray-50 transition-all',
          fullScreen
            ? 'h-screen sm:max-w-md sm:h-[80vh] sm:rounded-3xl overflow-y-auto scrollbar-hide'
            : 'max-w-md overflow-hidden rounded-3xl mx-2'
        )}
      >
        {children}
      </Dialog.Panel>
    </BlankModal>
  );
}
