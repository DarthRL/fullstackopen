import axios from 'axios'
import {useState} from 'react'

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
      </div>
    )
  }
  else if (filtered.length && filtered.length <= 10) {
    return (
      <div>
        {filtered.map(country => <div key={country.name.common}>{country.name.common}
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