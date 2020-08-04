import React from 'react'
import WeatherInfo from './WeatherInfo'

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

  export default CountryInfo