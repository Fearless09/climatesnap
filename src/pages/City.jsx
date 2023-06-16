import { useParams } from "react-router-dom"
import CurrentWeather from "../components/CurrentWeather"
import WeatherDetails from "../components/WeatherDetails"
import Forecast from "../components/Forecast"

function City({ city, forecast, data }) {
    const cityName = useParams()
    return (
        <div>
            {data && <CurrentWeather city={city} data={data} />}
            {data && <WeatherDetails city={city} data={data} />}
            {forecast && <Forecast city={city} forecast={forecast} data={data} />}
        </div >
    )
}

export default City
