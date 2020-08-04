import React, { useState, useEffect } from 'react'
import Filter from './components/contact-filter'
import Contacts from './components/contacts'
import ContactForm from './components/contact-form'
import personsServices from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personsServices
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, [])

const addContact = (event) => {
  event.preventDefault()
  if(persons.find(person => person.name === newName)) {
    if(window.confirm(`${newName} is already in contacts, would you like to replace the old number with the new one?`)) {
      const personToUp = persons.find(person => person.name === newName)
      const updatedPerson = { ...personToUp, number: newNumber}

      personsServices
        .update(updatedPerson.id, updatedPerson)
        .then(returnedContact => {
          setPersons(persons.map(person => person.id !== returnedContact.id ? person : returnedContact))
          setNewName('')
          setNewNumber('')
        })
    }
  }else{
    const newPerson = {
      "name": newName,
      "number": newNumber
    }

    personsServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }
}
const delContact = (id, nameToDel) => {
  if(window.confirm(`Delete ${nameToDel} ?`)) {
    personsServices
      .deletePerson(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
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
      <Contacts 
        names={persons} 
        filter={newFilter}
        delContact={delContact} />
    </div>
    
  )
}

export default App