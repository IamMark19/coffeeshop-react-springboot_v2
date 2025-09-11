import ModalDialog from './ModalDialog';

/**
 * @description The props for the confirm dialog.
 * @param {boolean} show If true, the dialog will be shown.
 * @param {string} title The title of the dialog.
 * @param {() => void} leftBtnClick A function to be called when the left button is clicked.
 * @param {() => void} rightBtnClick A function to be called when the right button is clicked.
 * @param {React.ReactNode} children The content to be displayed inside the dialog.
 */
interface ConfirmDialogProps {
  show: boolean;
  title: string;
  leftBtnClick: () => void;
  rightBtnClick: () => void;
  children?: React.ReactNode;
}

/**
 * @description A confirm dialog component.
 * @param {ConfirmDialogProps} props The props for the component.
 * @returns {React.ReactElement} The dialog component.
 */
export default function ConfirmDialog({
  show,
  title,
  leftBtnClick,
  rightBtnClick,
  children,
}: ConfirmDialogProps) {
  return (
    <ModalDialog
      show={show}
      title={title}
      closable={false}
      onClose={() => {}}
      leftBtn={{
        title: 'Cancel',
        onClick: () => {
          leftBtnClick();
        },
      }}
      rigthBtn={{
        title: 'OK',
        onClick: () => {
          rightBtnClick();
        },
      }}
    >
      {children}
    </ModalDialog>
  );
}
