import Title1 from '../typo/Title1';

/**
 * @description The props for the DocTitle1 component.
 * @param {string} children The title text.
 */
interface DocTitle1Props {
  children: string;
}

/**
 * @description A component for displaying a level 1 title in a document page.
 * @param {DocTitle1Props} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function DocTitle1({ children }: DocTitle1Props) {
  return <Title1 className="text-primary text-center mb-8">{children}</Title1>;
}
