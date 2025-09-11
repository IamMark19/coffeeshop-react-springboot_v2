import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

/**
 * @description The props for the BlankModal component.
 * @param {boolean} show If true, the modal will be shown.
 * @param {() => void} onClose A function to be called when the modal is closed.
 * @param {React.ReactNode} children The content to be displayed inside the modal.
 */
interface BlankModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * @description A blank modal component.
 * @param {BlankModalProps} props The props for the component.
 * @returns {React.ReactElement} The modal component.
 */
export default function BlankModal({
  show,
  onClose,
  children,
}: BlankModalProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
