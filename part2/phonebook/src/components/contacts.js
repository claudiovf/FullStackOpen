import React from 'react'

const Contacts = ({names, filter}) => {
    let namesList = []
    if(filter === '') {
      namesList = names.map(person => {
        return(
          <li key={person.name}>{person.name} {person.number}</li>
        )
      })
    }else{
      let filtered = names.filter(person => {
        return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      }) 
  
      namesList = filtered.map(person => {
        return(
          <li key={person.name}>{person.name} {person.number}</li>
        )
      })
    }
    return (
      <ul>
        {namesList}
      </ul>
    )
  }
  export default Contacts