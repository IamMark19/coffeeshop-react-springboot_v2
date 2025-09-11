import { classNames } from '@/utils/helper';

/**
 * @description The base props for a button component.
 * @param {React.ReactNode} children The content to be displayed inside the button.
 * @param {'submit' | 'reset' | 'button'} type The type of the button.
 * @param {React.MouseEventHandler<HTMLButtonElement>} onClick A function to be called when the button is clicked.
 * @param {string} className Additional class names for the button.
 * @param {boolean} disabled If true, the button will be disabled.
 */
export interface BaseButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

/**
 * @description A base button component.
 * @param {BaseButtonProps} props The props for the component.
 * @returns {React.ReactElement} The button component.
 */
export default function BaseButton({
  type = 'button',
  children,
  onClick,
  className,
  disabled = false,
}: BaseButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'focus:outline-none focus:ring-2 focus:ring-primary-200 rounded-lg',
        className,
        disabled
          ? 'bg-gray-500 border-gray-500 text-white cursor-not-allowed'
          : '',
      )}
    >
      {children}
    </button>
  );
}
