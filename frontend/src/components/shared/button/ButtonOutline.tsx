import { classNames } from '@/utils/helper';
import BaseButton, { BaseButtonProps } from './BaseButton';

/**
 * @description An outlined button component.
 * @param {BaseButtonProps} props The props for the component.
 * @returns {React.ReactElement} The button component.
 */
export default function ButtonOutline(props: BaseButtonProps) {
  const { className, children, ...extraProps } = props;
  const { disabled } = extraProps;

  return (
    <BaseButton
      {...extraProps}
      className={classNames(
        'inline-flex items-center justify-center gap-1 border font-medium py-1.5 px-3',
        disabled
          ? ''
          : 'hover:bg-primary text-primary hover:text-white border-primary',
        className
      )}
    >
      {children}
    </BaseButton>
  );
}
