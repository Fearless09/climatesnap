export {};

declare global {
  interface ForecastEntry {
    dt: number;
    main: MainWeatherData;
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Precipitation;
    snow?: Precipitation;
    sys: ForecastSys;
    dt_txt: string; // e.g. "2026-07-19 09:00:00"
  }

  interface ForecastSys {
    pod: "d" | "n";
  }

  interface City {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }

  interface WeatherForecast {
    cnt: number;
    list: ForecastEntry[];
    city: City;
  }
}
