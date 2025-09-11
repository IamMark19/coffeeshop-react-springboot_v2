import { classNames } from '@/utils/helper';
import { TitleProps } from './type';

/**
 * @description A component for displaying a level 2 title.
 * @param {TitleProps} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function Title2({ children, className }: TitleProps) {
  return (
    <h1 className={classNames('text-xl font-bold', className)}>
      {children}
    </h1>
  );
}
