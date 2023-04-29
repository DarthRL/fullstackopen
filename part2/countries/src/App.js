import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './conponents/Filter'
import CountryList from './conponents/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])

  const baseUrl = "https://restcountries.com/v3.1/all"

  useEffect(() => {
    axios.get(baseUrl).then(response => response.data)
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFiltered(filter
      ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
      : countries)
  }

  const [filtered, setFiltered] = useState([])

  const handleShow = (country) => {
    setFiltered([country])
  }

  return (
    <div>
      <Filter text="find countries" filter={filter} handleOnChange={handleFilterChange} />
      <CountryList filtered={filtered} handleShow={handleShow}/>

    </div>
  )
}

export default App