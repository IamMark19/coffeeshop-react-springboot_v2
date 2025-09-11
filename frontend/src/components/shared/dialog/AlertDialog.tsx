import ModalDialog from './ModalDialog';

/**
 * @description The data for the alert dialog.
 * @param {string} title The title of the dialog.
 * @param {string} bodyText The body text of the dialog.
 */
export interface AlertDialogData {
  title: string;
  bodyText?: string;
}

/**
 * @description The props for the alert dialog.
 * @param {boolean} show If true, the dialog will be shown.
 * @param {() => void} onClose A function to be called when the dialog is closed.
 * @param {string} title The title of the dialog.
 * @param {string} bodyText The body text of the dialog.
 */
interface AlertDialogProps {
  show: boolean;
  onClose: () => void;
  title: string;
  bodyText?: string;
}

/**
 * @description An alert dialog component.
 * @param {AlertDialogProps} props The props for the component.
 * @returns {React.ReactElement} The dialog component.
 */
export default function AlertDialog({
  show,
  onClose,
  title,
  bodyText,
}: AlertDialogProps) {
  const handleModalClose = () => {
    onClose();
  };
  return (
    <ModalDialog
      show={show}
      title={title}
      onClose={handleModalClose}
      rigthBtn={{
        title: 'OK',
        onClick: () => {
          onClose();
        },
      }}
    >
      <p>{bodyText}</p>
    </ModalDialog>
  );
}
