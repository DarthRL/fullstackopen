import axios from 'axios'
import { useState } from 'react'

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null)
  const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  const picBaseUrl = "https://openweathermap.org/img/wn/"
  const picEndUrl = "@2x.png"
  const api_key = process.env.REACT_APP_API_KEY
  axios.get(`${weatherBaseUrl}${location}&units=metric&appid=${api_key}`).then(response => response.data)
    .then(response => setWeather(response))
  if (!weather) return null
  const icon = `${picBaseUrl}${weather.weather[0].icon}${picEndUrl}`
  return (
    <div>
      <h2>Weather in {location}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img alt={weather.weather[0].description} src={icon} />
      <p>wind {weather.wind.speed}m/s</p>
    </div>
  )
}

const CountryList = ({ filtered, handleShow }) => {
  if (filtered.length === 1) {
    const country = filtered[0]
    const capital = country.capital
    const languages = country.languages
    const flag = country.flags.png
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {capital}</p>
        <h3>languages:</h3>
        <ul>
          {Object.keys(languages).map(key => <li key={key} >{languages[key]}</li>)}
        </ul>
        <img alt="flag" src={flag} />
      <Weather location={capital} />
      </div>
    )
  }
  else if (filtered.length && filtered.length <= 10) {
    return (
      <div>
        {filtered.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => handleShow(country.name.common)}>show</button>
        </div>)}
      </div>
    )
  }
  else if (filtered.length) {
    return <div>Too many matches, specify another filter</div>
  }
  else {
    return null
  }
}

export default CountryList