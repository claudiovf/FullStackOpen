import React, { useState, useEffect } from 'react'
import Filter from './components/contact-filter'
import Contacts from './components/contacts'
import ContactForm from './components/contact-form'
import Axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    Axios
    .get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
    })
  }, [])
const addContact = (event) => {
  event.preventDefault()
  if(persons.find(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
  }else{
    setPersons(persons.concat({
      "name": newName,
      "number": newNumber
    }))
    setNewName('')
    setNewNumber('')
  }
}
const handleChangeFilter = (event) => setNewFilter(event.target.value)
const handleChangeName = (event) => setNewName(event.target.value)
const handleChangeNumber = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleChangeFilter} />
      <h2>Add New</h2>
      <ContactForm 
        addContact={addContact}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber} 
      />
      <h2>Numbers</h2>
      <Contacts names={persons} filter={newFilter}/>
    </div>
    
  )
}

export default App