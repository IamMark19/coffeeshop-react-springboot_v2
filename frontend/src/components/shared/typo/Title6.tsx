import { classNames } from '@/utils/helper';
import { TitleProps } from './type';

/**
 * @description A component for displaying a level 6 title.
 * @param {TitleProps} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function Title6({ children, className }: TitleProps) {
  return (
    <h6 className={classNames('text-base font-semibold', className)}>
      {children}
    </h6>
  );
}
