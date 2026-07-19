"use client";

import { defaultCoordinate } from "@/data/default-coordinate";
import { fetcher, getData, saveData, STORAGE_KEY } from "@/utils/fetcter";
import { getCurrentPosition } from "@/utils/utils";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";

type State = {
  favorites: GeocodingResult[];
  locationData: GeocodingResult | null;
  weatherData: OpenWeatherMap | null;
  loading: { location: boolean; weather: boolean; forecast: boolean };
  forecast: WeatherForecast | null;
};
type Action =
  // Loading
  | {
      type: "set-loading";
      payload: { location?: boolean; weather?: boolean; forecast?: boolean };
    }

  // Faovrite
  | { type: "set-favorites"; payload: GeocodingResult[] }
  | { type: "toggle-favorite"; payload: GeocodingResult }

  // Location
  | { type: "set-location"; payload: GeocodingResult }
  | { type: "set-weather"; payload: OpenWeatherMap }

  // Forecast
  | { type: "set-forecast"; payload: WeatherForecast };

type ContextType = State & {
  weatherDispacter: (action: Action) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

const initialState: State = {
  loading: { location: false, weather: false, forecast: false },
  favorites: [],
  locationData: null,
  weatherData: null,
  forecast: null,
};

const WeatherContext = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const weatherDispacter = (action: Action) => dispatch(action);

  useEffect(() => {
    async function init() {
      weatherDispacter({
        type: "set-loading",
        payload: { location: true, weather: true, forecast: true },
      });
      try {
        const { lat, lng } = await getCurrentPosition(defaultCoordinate);

        const [address, weather, forecast, favorites] = await Promise.all([
          fetcher<GeocodingResult[]>("/api/address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `${lat},${lng}` }),
          }),
          fetcher<OpenWeatherMap>("/api/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lng }),
          }),
          fetcher<WeatherForecast>("/api/forecast", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lng }),
          }),
          getData<GeocodingResult[]>(STORAGE_KEY, []),
        ]);

        weatherDispacter({ type: "set-favorites", payload: favorites });
        weatherDispacter({ type: "set-location", payload: address[0] });
        weatherDispacter({ type: "set-weather", payload: weather });
        weatherDispacter({ type: "set-forecast", payload: forecast });
      } catch (error) {
      } finally {
        weatherDispacter({
          type: "set-loading",
          payload: { location: false, weather: false, forecast: false },
        });
      }
    }

    init();
  }, []);

  return <Context.Provider value={{ ...state, weatherDispacter }} {...props} />;
};

export default WeatherContext;

export const useWeather = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set-loading": {
      return {
        ...state,
        loading: {
          location: action.payload.location ?? state.loading.location,
          weather: action.payload.weather ?? state.loading.weather,
          forecast: action.payload.forecast ?? state.loading.forecast,
        },
      };
    }

    case "set-favorites": {
      saveData(STORAGE_KEY, action.payload);
      return { ...state, favorites: action.payload };
    }

    case "toggle-favorite": {
      const formatted = action.payload.formatted.toLowerCase();
      const isFavorite = state.favorites.some(
        (f) => f.formatted.toLowerCase() === formatted,
      );

      const favorites = isFavorite
        ? state.favorites.filter((f) => f.formatted.toLowerCase() !== formatted)
        : [action.payload, ...state.favorites];

      saveData(STORAGE_KEY, favorites);
      return { ...state, favorites };
    }

    case "set-location": {
      return { ...state, locationData: action.payload };
    }

    case "set-weather": {
      return { ...state, weatherData: action.payload };
    }

    case "set-forecast": {
      return { ...state, forecast: action.payload };
    }

    default:
      return state;
  }
};
