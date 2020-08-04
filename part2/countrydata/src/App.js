import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Matches from './Matches'
import CountryInfo from './CountryInfo'
import Search from './Search'



function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState('')
  const [weather, setWeather] = useState('')

  const handleSetWeather = data => {
    setWeather(data)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleChangeSearch = event => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Search onChange={handleChangeSearch} />
      <Matches countries={countries} search={search} newHandle={props => setSelected(props)} />
      <CountryInfo selected={selected} handleSetWeather={handleSetWeather} weather={weather}/>
      

    </div>
  )
}

export default App;
