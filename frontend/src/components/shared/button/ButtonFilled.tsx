import { classNames } from '@/utils/helper';
import BaseButton, { BaseButtonProps } from './BaseButton';

/**
 * @description A filled button component.
 * @param {BaseButtonProps} props The props for the component.
 * @returns {React.ReactElement} The button component.
 */
export default function ButtonFilled(props: BaseButtonProps) {
  const { className, children, ...extraProps } = props;
  const { disabled } = extraProps;
  return (
    <BaseButton
      {...extraProps}
      className={classNames(
        'inline-flex items-center justify-center gap-1 text-white font-medium border py-1.5 px-3',
        disabled
          ? ''
          : 'bg-primary hover:bg-primary-600 border-primary',
        className
      )}
    >
      {children}
    </BaseButton>
  );
}
