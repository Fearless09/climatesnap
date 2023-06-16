import { useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { weatherApiKey, WeatherApiUrl, openCageApiKey, openCageUrl } from './api'
import './App.css'
import Navbar from './components/Navbar'
import City from './pages/City';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Loading from './components/Loading';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FAQ from './pages/FAQ';

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [city, setCity] = useState(null)
  const [loading, setLoading] = useState(true)

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
        const city = data.results[0].components.city;
        const country_code = data.results[0].components.country_code.toUpperCase()
        setCity(`${city} ${country_code}`)
        fetchFunc(latitude, longitude)

        // console.log(data.results[0])


        // console.log("City:", city);
        // console.log("Latitude:", latitude);
        // console.log("Longitude:", longitude);
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getUserLocation();
  }, [])


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
      .catch((error) => console.log(error))
  }

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
