import { classNames } from '@/utils/helper';
import { TitleProps } from './type';

/**
 * @description A component for displaying a level 3 title.
 * @param {TitleProps} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function Title3({ children, className }: TitleProps) {
  return (
    <h3 className={classNames('text-xl font-semibold', className)}>
      {children}
    </h3>
  );
}
