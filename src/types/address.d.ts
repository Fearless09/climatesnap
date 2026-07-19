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
    // OpenStreetMap general fields
    _category: string;
    _type: string;
    continent: string;
    country: string;
    country_code: string;

    // OpenCage specific fields
    "ISO_3166-1_alpha-2"?: string;
    "ISO_3166-1_alpha-3"?: string;
    "ISO_3166-2"?: string[];
    _normalized_city?: string;
    borough?: string;
    city?: string;
    coworking_space?: string;
    house_number?: string;
    neighbourhood?: string;
    political_union?: string;
    postcode?: string;
    quarter?: string;
    road?: string;
    state?: string;
    state_code?: string;
    suburb?: string;
    // Allows other component keys not explicitly listed
    // (OpenCage returns different fields depending on result type)
    [key: string]: string | string[] | undefined;
  }

  interface GeocodingResult {
    bounds?: Bounds;
    components: GeocodingComponents;
    confidence: number;
    formatted: string;
    geometry: LatLng;
  }
}
