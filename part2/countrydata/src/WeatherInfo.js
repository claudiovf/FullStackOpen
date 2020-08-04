import React, {useEffect} from 'react'
import axios from 'axios'

const WeatherInfo = ({selectedCapital, weather, handleSetWeather}) => {

  
    const weather_api = process.env.REACT_APP_OPEN_WEATHER
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCapital}&appid=${weather_api}`
    
   
  console.log(weather_api)
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
  export default WeatherInfo