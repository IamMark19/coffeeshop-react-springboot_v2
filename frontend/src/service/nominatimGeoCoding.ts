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
            'CoffeeShopApp/1.0 (https://github.com/sannlynnhtun-coding/coffee-shop-app)',
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
