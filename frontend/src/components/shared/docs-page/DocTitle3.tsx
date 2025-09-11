import Title3 from '../typo/Title3';

/**
 * @description The props for the DocTitle3 component.
 * @param {string} children The title text.
 */
interface DocTitle3Props {
  children: string;
}

/**
 * @description A component for displaying a level 3 title in a document page.
 * @param {DocTitle3Props} props The props for the component.
 * @returns {React.ReactElement} The title component.
 */
export default function DocTitle3({ children }: DocTitle3Props) {
  return <Title3 className="text-gray-600 mt-3 mb-2">{children}</Title3>;
}
