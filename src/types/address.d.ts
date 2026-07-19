export {};

declare global {
  interface LatLng {
    lat: number;
    lng: number;
  }

  interface Bounds {
    northeast: LatLng;
    southwest: LatLng;
  }

  interface GeocodingComponents {
    _category: string;
    _type: string;
    continent: string;
    country: string;
    country_code: string;
  }

  interface GeocodingResult {
    bounds?: Bounds;
    components: GeocodingComponents;
    confidence: number;
    formatted: string;
    geometry: LatLng;
  }
}
