import { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { weatherApiKey, WeatherApiUrl, openCageApiKey, openCageUrl } from './api'
import Navbar from './components/Navbar'
import City from './pages/City';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Loading from './components/Loading';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FAQ from './pages/FAQ';
import Alert from './components/Alert';

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [city, setCity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorOUt, setErrorOut] = useState(true)

  // Abuja Weather Fetch
  const abujaData = () => {
    setCity('Abuja NG')
    const latitude = 9.072264
    const longitude = 7.491302
    fetchFunc(latitude, longitude)
  }

  // User Location Fetch
  async function getUserLocation() {
    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(`${openCageUrl}/json?q=${latitude}+${longitude}&key=${openCageApiKey}`);
        const data = await response.json();
        let city = data.results[0].components.city;

        const county = data.results[0].components.county
        if (city === undefined) {
          if (county) {
            const countyArr = county.split(' ')
            city = countyArr[0]
            // console.log(city)
          } else {
            city = 'Unrecognized City'
          }
        }
        const country_code = data.results[0].components.country_code.toUpperCase()

        // console.log(data.results[0].components.county)
        setCity(`${city} ${country_code}`)
        fetchFunc(latitude, longitude)

      } catch (error) {
        // console.log("Error:", error);
        setErrorMessage(error.message)
        abujaData()
      }

    } else {
      console.log("Geolocation is not supported by this browser.");
      setErrorMessage('Geolocation is not supported by this browser.')
      abujaData()
    }
  }

  // User Location Fetch on Load 
  useEffect(() => {
    getUserLocation();
  }, [])

  // Fetch Weather
  const fetchFunc = (lat, lon) => {
    const fetchWeather = fetch(`${WeatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
    const fetchForecast = fetch(`${WeatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)

    Promise.all([fetchWeather, fetchForecast])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setWeather(weatherResponse)
        setForecast(forecastResponse)
        setLoading(false)
        // setWeather({ city: searchData.label, ...weatherResponse })
        // setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch((error) => {
        // console.log(error)
        setErrorMessage(error)
        setLoading(false)
      })
  }

  // Fetch City on Location Change
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ')
    setCity(searchData.label)

    fetchFunc(lat, lon)
  }

  // console.log(forecast)
  // console.log(weather)


  return (
    <Router>
      <Navbar setLoading={setLoading} getUserLocation={getUserLocation} onSearchChange={handleOnSearchChange} />

      <div className='avoidnav' />

      <ScrollToTop />

      {errorMessage && errorOUt && (
        <>
          <Alert message={errorMessage} />
          <div className="opacity-0 position-absolute">
            {setTimeout(() => setErrorOut(false), 3500)}
          </div>
        </>
      )}
      {loading && <Loading />}

      <Routes>

        <Route index element={<Homepage city={city} forecast={forecast} data={weather} />} />

        <Route path='/city/:city' element={<City city={city} forecast={forecast} data={weather} />} />

        <Route path='/about' element={<About />} />

        <Route path='/faq' element={<FAQ />} />

      </Routes>

      <Footer />
    </Router>
  )
}

export default App
