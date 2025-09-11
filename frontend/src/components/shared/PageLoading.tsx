import { Dialog } from '@headlessui/react';
import BlankModal from './modal/BlankModal';
import LoadingSpinner from './LoadingSpinner';

/**
 * @description A page loading component that displays a loading spinner in a modal.
 * @param {boolean} show If true, the loading spinner will be shown.
 */
interface PageLoadingProps {
  show: boolean;
}
export default function PageLoading({ show }: PageLoadingProps) {
  return (
    <BlankModal show={show} onClose={() => {}}>
      <Dialog.Panel className="flex items-center justify-center w-full h-screen max-h-f transform transition-all">
        <LoadingSpinner />
      </Dialog.Panel>
    </BlankModal>
  );
}
