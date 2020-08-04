import React from 'react'

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

  export default Matches