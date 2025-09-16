import { useState } from 'react';
import { LatLng, UserAddress } from '@/types';
import useDebounce from '@/hooks/useDebounce';
import { useUserAddress } from '@/hooks/useUserAddress';
import BaseModal from '@/components/shared/modal/BaseModal';
import StickyModalHeader from '../StickyModalHeader';
import React from 'react';
const MapComponent = React.lazy(
  () => import('@/components/shared/MapComponent')
);
import FlexContainer from '../FlexContainer';
import FullHeightContainer from '../FullHeightContainer';
import ControlButtons from './ControlButtons';
import InputBox from './InputBox';
import useAddress from './useAddress';
import { getCoordFromAddress } from '@/service/nominatimGeoCoding';
import { useEffect } from 'react';

interface AddressModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AddressModal({ show, onClose }: AddressModalProps) {
  // Auth Provider
  const { address: userAddress, updateAddress } = useUserAddress();
  // Input
  const [coordinate, setCoordinate] = useState<LatLng | null>(
    userAddress?.coordinates || null
  );
  const [mapCenter, setMapCenter] = useState<LatLng | undefined>(
    userAddress?.coordinates
  );
  const deferredCord = useDebounce(coordinate);

  const { address, setAddress, isLoading } = useAddress(
    deferredCord,
    userAddress?.fullAddress || ''
  );

  const debouncedAddress = useDebounce(address, 500);

  useEffect(() => {
    if (debouncedAddress) {
      handleSearch(debouncedAddress);
    }
  }, [debouncedAddress]);

  const confirmBtnDisabled = !coordinate || address.length > 255;

  const handleCoordChange = (newCoor: LatLng) => {
    setCoordinate(newCoor);
  };

  const handleSearch = async (searchTerm: string) => {
    const newCoord = await getCoordFromAddress(searchTerm);
    if (newCoord) {
      setCoordinate(newCoord);
      setMapCenter(newCoord);
    }
  };

  const handelConfirm = () => {
    if (coordinate) {
      const newAddress: UserAddress = {
        fullAddress: address,
        coordinates: coordinate,
      };
      updateAddress(newAddress);
      onClose();
    }
  };

  return (
    <BaseModal show={show} onClose={() => {}} fullScreen>
      <FlexContainer>
        <StickyModalHeader title="Change Address" onClose={onClose} />
        <FullHeightContainer>
          <InputBox
            value={address}
            onChange={setAddress}
            isLoading={isLoading}
          />
          <div className="w-full h-80 sm:h-72 bg-gray-300 rounded-lg overflow-hidden mt-4">
            <React.Suspense
              fallback={<div className="w-full h-full bg-gray-300" />}
            >
              <MapComponent
                onCoordChange={handleCoordChange}
                center={mapCenter}
              />
            </React.Suspense>
          </div>
          <ControlButtons
            onCancelClick={onClose}
            onConfirmClick={handelConfirm}
            confirmBtnDisabled={confirmBtnDisabled}
          />
        </FullHeightContainer>
      </FlexContainer>
    </BaseModal>
  );
}
