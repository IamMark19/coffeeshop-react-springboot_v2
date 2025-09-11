/**
 * @description A card component for displaying an address.
 * It has a background image and a gradient overlay.
 * @param {React.ReactNode} children The content to be displayed inside the card.
 */
interface AddressCardProps {
  children: React.ReactNode;
}

export default function AddressCard({ children }: AddressCardProps) {
  return (
    <div className="w-full h-32 bg-[url('/images/google-maps-vecotr.png')] bg-cover rounded-2xl overflow-hidden">
      <div className="w-full h-full bg-gradient-to-t from-primary-300">
        {children}
      </div>
    </div>
  );
}
