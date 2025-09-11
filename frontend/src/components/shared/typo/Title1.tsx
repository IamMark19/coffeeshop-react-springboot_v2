import { classNames } from '@/utils/helper';
import { TitleProps } from './type';

/**
 * @description A component for displaying a level 1 title.
 * @param {TitleProps} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function Title1({ children, className }: TitleProps) {
  return (
    <h1 className={classNames('text-2xl font-bold', className)}>
      {children}
    </h1>
  );
}
