import React, {useState, useEffect} from 'react';
import axios from 'axios'


const Search = ({onChange}) => {
  return (
    <div>
      Search countries: <input onChange={onChange} />
    </div>
  )
}

const CountryInfo = ({selected}) => {
  console.log('this', selected)
  
  if(!(typeof selected === 'object')) {
    return ''

  }else{
    return (
      <>
        <h2>{selected.name}</h2>
        <p>Capital: {selected.capital}</p>
        <p>Population: {selected.population}</p>
        <h3>Languages</h3>
        {/* <ul>{langList}</ul> */}
        <img src={selected.flag} alt="flag" width="150px" height="auto" />
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
      <CountryInfo selected={selected} />
      

    </div>
  )
}

export default App;
