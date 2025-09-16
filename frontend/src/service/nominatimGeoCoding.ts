import { LatLng } from '../types';
import axios from 'axios';

export const getAddrFromCoordinate = async (
  coordinate: LatLng
): Promise<string> => {
  try {
    const response = await axios.get('/api/geocoding/reverse', {
      params: {
        lat: coordinate.lat,
        lon: coordinate.lng,
      },
    });

    if (response.status === 200) {
      const data = JSON.parse(response.data);
      const addr = data?.display_name;
      return addr || '';
    }
    return '';
  } catch (error) {
    return '';
  }
};

export const getCoordFromAddress = async (
  addr: string
): Promise<LatLng | null> => {
  try {
    const response = await axios.get('/api/geocoding/search', {
      params: {
        q: addr,
      },
    });

    if (response.status === 200) {
      const data = JSON.parse(response.data);
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
