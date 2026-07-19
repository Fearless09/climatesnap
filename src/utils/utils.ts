import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIconUrl = (code: string) => {
  if (!code.trim()) return "https://openweathermap.org/img/wn/01d@4x.png";

  return `https://openweathermap.org/img/wn/${code}@4x.png`;
};

export const getDate = (timestamp: number, timezoneOffset: number = 0) => {
  return new Date((timestamp + timezoneOffset) * 1000);
};

interface GeolocationResult extends LatLng {
  accuracy: number | null;
  error: string | null;
}

export async function getCurrentPosition(
  defaultCoords: LatLng,
): Promise<GeolocationResult> {
  return new Promise<GeolocationResult>((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        ...defaultCoords,
        accuracy: null,
        error: "Geolocation is not supported by this browser.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
        });
      },
      (error: GeolocationPositionError) => {
        resolve({
          ...defaultCoords,
          accuracy: null,
          error: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}
