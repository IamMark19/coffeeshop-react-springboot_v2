import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { LatLng } from '@/types';
import { useUserAddress } from '@/hooks/useUserAddress';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
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
}

export interface MapComponentRef {
  setNewPosition: (latLng: LatLng) => void;
}

const MapComponent: React.ForwardRefRenderFunction<
  MapComponentRef,
  MapComponentProps
> = ({ onCoordChange }, ref) => {
  const { address } = useUserAddress();
  const initLoc = address?.coordinates || defaultCoordinate;

  const [position, setPosition] = useState(initLoc);

  const markerRef = useRef(null);
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

  const Recenter = ({ lat, lng }: LatLng) => {
    const map = useMap();
    React.useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
  };

  useImperativeHandle(ref, () => ({
    setNewPosition: (latLng: LatLng) => {
      setPosition(latLng);
    },
  }));

  return (
    <div className="relative w-full h-full">
      <MapContainer
        style={{
          height: '100%',
        }}
        center={position}
        zoom={14}
        scrollWheelZoom={true}
      >
        <Recenter lat={position.lat} lng={position.lng} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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

export default forwardRef(MapComponent);
