import CurrentWeather from "../components/CurrentWeather"
import WeatherDetails from "../components/WeatherDetails"
import Forecast from "../components/Forecast"
import { Link } from "react-router-dom"

function Homepage({ city, forecast, data }) {

    return (
        <>
            {/* <Link to={'/city'}>City</Link> */}
            {data && <CurrentWeather city={city} data={data} />}
            {data && <WeatherDetails city={city} data={data} />}
            {forecast && <Forecast city={city} forecast={forecast} data={data} />}
        </>
    )
}

export default Homepage
