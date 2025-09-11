import Title2 from '../typo/Title2';

/**
 * @description The props for the DocTitle2 component.
 * @param {string} children The title text.
 */
interface DocTitle2Props {
  children: string;
}

/**
 * @description A component for displaying a level 2 title in a document page.
 * @param {DocTitle2Props} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function DocTitle2({ children }: DocTitle2Props) {
  return <Title2 className="text-primary mt-8 mb-2">{children}</Title2>;
}
