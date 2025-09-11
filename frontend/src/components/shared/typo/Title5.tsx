import { classNames } from '@/utils/helper';
import { TitleProps } from './type';

/**
 * @description A component for displaying a level 5 title.
 * @param {TitleProps} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function Title5({ children, className }: TitleProps) {
  return (
    <h3 className={classNames('text-base font-bold', className)}>
      {children}
    </h3>
  );
}
