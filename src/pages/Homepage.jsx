import CurrentWeather from "../components/CurrentWeather";
import WeatherDetails from "../components/WeatherDetails";
import Forecast from "../components/Forecast";

function Homepage({ city, forecast, data }) {
  return (
    <>
      {data && (
        <>
          <CurrentWeather city={city} data={data} />
          <WeatherDetails city={city} data={data} />
        </>
      )}
      {forecast && <Forecast city={city} forecast={forecast} data={data} />}
    </>
  );
}

export default Homepage;
