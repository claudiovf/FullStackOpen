import React, { useState } from 'react'
import Filter from './contact-filter'
import Contacts from './contacts'
import ContactForm from './contact-form'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323530' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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