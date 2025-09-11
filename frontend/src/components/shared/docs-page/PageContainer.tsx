/**
 * @description The props for the PageContainer component.
 * @param {React.ReactNode} children The content to be displayed inside the container.
 */
interface PageContainerProps {
  children: React.ReactNode;
}

/**
 * @description A container component for a document page.
 * @param {PageContainerProps} props The props for the component.
 * @returns {React.ReactElement} The container component.
 */
export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className=" text-gray-700 rounded-xl border border-primary-200 p-4 sm:p-8 my-2 sm:my-8 mx-2 lg:mx-0">
      {children}
    </div>
  );
}
