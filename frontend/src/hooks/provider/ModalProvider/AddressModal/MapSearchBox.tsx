import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

interface MapSearchBoxProps {
  onSearch: (searchTerm: string) => void;
}

export default function MapSearchBox({ onSearch }: MapSearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="flex items-center gap-2 mt-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a location"
        className="flex-grow border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  );
}
