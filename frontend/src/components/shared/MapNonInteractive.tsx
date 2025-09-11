import { useUserAddress } from '@/hooks/useUserAddress';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultCoordinate } from '@/constants/constants';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LatLng } from '@/types';
import React from 'react';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Recenter = ({ lat, lng }: LatLng) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

/**
 * @description A non-interactive map component that displays a marker.
 * @returns {React.ReactElement} The map component.
 */
const MapNonInteractive = () => {
  const { address } = useUserAddress();
  const initLoc = address?.coordinates || defaultCoordinate;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        style={{
          height: '100%',
        }}
        center={initLoc}
        zoom={14}
        scrollWheelZoom={true}
        dragging={false}
        zoomControl={false}
      >
        <Recenter lat={initLoc.lat} lng={initLoc.lng} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker draggable={false} position={initLoc}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapNonInteractive;
