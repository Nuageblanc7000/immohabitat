import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { streetDto } from './dto/streetDto.dto';

@Injectable()
export class GeolocalisaionService {
  constructor(private config: ConfigService) {}
  private apiKey = this.config.get('GEO_KEY');
  async findNearbyCities(latitude: number, longitude: number) {
    try {
      const radius = 40; // Rayon de recherche en kilomètres
      const limit = 10;
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${this.apiKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1&limit=${limit}&radius=${radius}`;
      const response = await axios.get(url);
      const results = response.data.results;
      return results;
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la recherche des villes proches :",
        error,
      );
      return [];
    }
  }

  async searchByStreet(street: streetDto) {
    try {
      console.log(street.street);
      const encodedStreet = encodeURIComponent(street.street);
      const encodedCountry = encodeURIComponent('Belgium');
      const url = `https://api.opencagedata.com/geocode/v1/json?key=${this.apiKey}&q=${encodedStreet}&pretty=1&no_annotations=1&limit=20`;

      const response = await axios.get(url);
      const results = await response.data.results;
      console.log(results);

      // Traitez les résultats pour obtenir les informations dont vous avez besoin
      return results.map((r) => r.formatted);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la recherche de la rue :",
        error,
      );
      return [];
    }
  }
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadius = 6371; // Rayon de la Terre en kilomètres

    const toRadians = (degrees: number) => {
      return (degrees * Math.PI) / 180;
    };

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  }
}
