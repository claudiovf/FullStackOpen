import React, {useState, useEffect} from 'react';
import axios from 'axios'


const Search = ({onChange}) => {
  return (
    <div>
      Search countries: <input onChange={onChange} />
    </div>
  )
}

const WeatherInfo = ({selectedCapital, weather, handleSetWeather}) => {

  
  const weather_api = process.env.REACT_APP_OPEN_WEATHER
  let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCapital}&appid=${weather_api}`
  
 

  useEffect(() => {
      axios
      .get(weatherUrl)
      .then(res => {
        if(!(selectedCapital === weather.name)) {
          handleSetWeather(res.data)
          return res.data
        }
      })
  })
  let toDisplay = () => {
    if(typeof weather === 'object') {
      let windDir = degree => {
        if (degree>337.5) return 'N';
        if (degree>292.5) return 'NW';
        if(degree>247.5) return 'W';
        if(degree>202.5) return 'SW';
        if(degree>157.5) return 'S';
        if(degree>122.5) return 'SE';
        if(degree>67.5) return 'E';
        if(degree>22.5){return 'NE';}
        return 'N';
    }
      let kelToCelsius = temp => (temp - 273.15).toFixed(1)
      
      return (
        <>
          <div>Temperature: {kelToCelsius(weather.main.temp)} Celsius</div>
          <div>Weather: {weather.weather[0].main}</div>
          <div>wind: {weather.wind.speed} mph - Direction {windDir(weather.wind.deg)} </div>
        </>
      )
    }
  }

    return (
    <div>{toDisplay()}</div>
    )
}

const CountryInfo = ({selected, handleSetWeather, weather}) => {
  
  if(!(typeof selected === 'object')) {
    return ''

  }else{
    let langList = selected.languages.map(lang => {
      return (
        <li key={lang.name}>{lang.name}</li>
      )
    })
    return (
      <>
        <h2>{selected.name}</h2>
        <p>Capital: {selected.capital}</p>
        <p>Population: {selected.population}</p>
        <h3>Languages</h3>
        <ul>{langList}</ul>
        <img src={selected.flag} alt="flag" width="auto" height="100px" />
        <h3>Weather in {selected.capital}</h3>
        <WeatherInfo selectedCapital={selected.capital} weather={weather} handleSetWeather={handleSetWeather} />
     
      </>
    )
  }
  
}
const Matches = ({countries, search, newHandle}) => {
  const filtered = countries.filter(country => {
    return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })
  let matchesDisplay = []
  if(search === '') {
    matchesDisplay = ''

  }else if(filtered.length >= 10) {
    matchesDisplay = "Too many matches, specify another letter"
    newHandle('')

  }else if (filtered.length === 1){
    matchesDisplay = ''
    newHandle(filtered[0])

  }else if(filtered.length < 10){
    matchesDisplay = filtered.map(country => {
      return (
          <li key={country.name}>{country.name}
            <button value={country.name} onClick={() => newHandle(country)}>Show</button>
          </li>
      )
    })

  }
  return (
    <div>
      <div>{matchesDisplay}</div>
    </div>
  )
}

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
