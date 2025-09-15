import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LatLng } from '@/types';
import { useUserAddress } from '@/hooks/useUserAddress';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultCoordinate } from '@/constants/constants';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  onCoordChange?: (value: LatLng) => void;
  center?: LatLng;
}

const MapComponent: React.FC<MapComponentProps> = ({
  onCoordChange,
  center,
}) => {
  const { address } = useUserAddress();
  const initLoc = center || address?.coordinates || defaultCoordinate;

  const [position, setPosition] = useState(initLoc);

  useEffect(() => {
    if (center) {
      setPosition(center);
    }
  }, [center]);

  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = (marker as L.Marker).getLatLng();
          setPosition({ lat, lng });
          onCoordChange?.({ lat, lng });
        }
      },
    }),
    [onCoordChange]
  );

  return (
    <div className='relative w-full h-full'>
      <MapContainer
        key={JSON.stringify(position)}
        style={{
          height: '100%',
        }}
        center={position}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        ></Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
