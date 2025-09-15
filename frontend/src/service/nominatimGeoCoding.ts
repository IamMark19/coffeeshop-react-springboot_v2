import { LatLng } from '../types';
import axios from 'axios';

export const getAddrFromCoordinate = async (
  coordinate: LatLng
): Promise<string> => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat: coordinate.lat,
          lon: coordinate.lng,
          format: 'json',
        },
        headers: {
          'User-Agent':
            'BrewTopiaApp/1.0 (https://github.com/sannlynnhtun-coding/coffee-shop-app)',
        },
      }
    );

    if (response.status === 200) {
      const addr = response.data?.display_name;
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
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: addr,
          format: 'json',
          limit: 1,
        },
        headers: {
          'User-Agent':
            'BrewTopiaApp/1.0 (https://github.com/sannlynnhtun-coding/coffee-shop-app)',
        },
      }
    );

    if (response.status === 200 && response.data?.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    return null;
  } catch (error) {
    return null;
  }
};
