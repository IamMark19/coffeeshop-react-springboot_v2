import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/utils/helper';
import ButtonOutline from '../button/ButtonOutline';
import ButtonFilled from '../button/ButtonFilled';
import BaseModal from '../modal/BaseModal';

/**
 * @description The props for the modal buttons.
 * @param {string} title The title of the button.
 * @param {() => void} onClick A function to be called when the button is clicked.
 */
export interface ModalBtn {
  title: string;
  onClick?: () => void;
}

/**
 * @description The props for the modal dialog.
 * @param {boolean} show If true, the dialog will be shown.
 * @param {() => void} onClose A function to be called when the dialog is closed.
 * @param {string} title The title of the dialog.
 * @param {React.ReactNode} children The content to be displayed inside the dialog.
 * @param {ModalBtn} rigthBtn The props for the right button.
 * @param {ModalBtn} leftBtn The props for the left button.
 * @param {boolean} closable If true, the dialog can be closed by clicking the backdrop or the close button.
 */
interface ModalDialogProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  rigthBtn: ModalBtn;
  leftBtn?: ModalBtn;
  closable?: boolean;
}

/**
 * @description A modal dialog component.
 * @param {ModalDialogProps} props The props for the component.
 * @returns {React.ReactElement} The dialog component.
 */
export default function ModalDialog({
  show,
  onClose,
  title,
  children,
  rigthBtn,
  leftBtn,
  closable = true,
}: ModalDialogProps) {
  const handleBackdropClick = () => {
    if (closable) {
      onClose();
    }
  };

  const handleCloseBtnClick = () => {
    onClose();
  };

  const handleRightBtnClick = () => {
    if (closable) {
      onClose();
    }
    if (rigthBtn.onClick) {
      rigthBtn.onClick();
    }
  };

  const handleLeftBtnClick = () => {
    if (closable) {
      onClose();
    }
    if (leftBtn?.onClick) {
      leftBtn.onClick();
    }
  };

  return (
    <BaseModal show={show} onClose={handleBackdropClick}>
      <div className="relative">
        <div className="border-b py-4 px-6">
          <h6 className="text-xl font-bold line-clamp-2">{title}</h6>
        </div>
        {closable && (
          <div className="absolute top-3 right-3">
            <button
              onClick={handleCloseBtnClick}
              className="bg-black/10 hover:bg-black/30 text-black rounded-full p-2"
            >
              <XMarkIcon className="w-6 h-6 stroke-2" />
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
          <div
            className={classNames(
              'flex items-center mt-8',
              leftBtn ? 'justify-between' : 'justify-end'
            )}
          >
            {leftBtn && (
              <ButtonOutline onClick={handleLeftBtnClick}>
                {leftBtn?.title}
              </ButtonOutline>
            )}
            <ButtonFilled onClick={handleRightBtnClick}>
              {rigthBtn.title}
            </ButtonFilled>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
