import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newCriteria, setNewCriteria ] = useState('')
  const personsToShow = persons.filter(person => person.name.includes(newCriteria))
  const [errorMessage, setErrorMessage] = useState(null)

  const rows = () => personsToShow.map(person =>
    <Person
      key={person.id}
      person={person}
      removeFunction={removePerson}
    />
  )  

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  const removePerson = (event) => {
    event.preventDefault()
    if(window.confirm(`Poistetaanko ${event.target.name}?`)){
      personService
        .remove(event.target.value)
          .then(setPersons(persons.filter(person => person.id != event.target.value)))
      setErrorMessage(`${event.target.name} poistettiin puhelinluettelosta.`)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.find(person => person.name === newName)){
      const oldPerson = persons.find(person => person.name === newName)
      if(window.confirm(`${newName} on jo luettelossa. Haluatko korvata yhteystiedon?`)){
            const updatedPersonObject = {
              name: newName,
              number: newNumber,
              id: oldPerson.id
            }
      
            personService
              .update(updatedPersonObject.id,updatedPersonObject)
              .catch(error => {
                setErrorMessage(`Yhteystieto "${updatedPersonObject.name}" on jo poistettu palvelimelta.`)
              })

              const personToRemove = persons.find(person => person.id === updatedPersonObject.id)
              const index = persons.indexOf(personToRemove)
              persons.splice(index,1,updatedPersonObject)
              setNewName("")
              setNewNumber("")
              setErrorMessage(`Yhteystiedon "${updatedPersonObject.name}" tiedot päivitettiin.`)
            }
        }
        else{
          personService
            .create(personObject)
              .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
                setErrorMessage(`${returnedPerson.name} lisättiin puhelinluetteloon.`)
              })
        }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleCriteriaChange = (event) => {
    setNewCriteria(event.target.value)
  }

  return (
    <div>

      <Notification message={errorMessage} />

      <h1>Puhelinluettelo</h1>  
      <Filter
        filterCriteria = {newCriteria}
        changeHandler = {handleCriteriaChange}
      />
      <PersonForm
        name = {newName}
        number = {newNumber}
        nameHandler = {handleNameChange}
        numberHandler = {handleNumberChange}
        addFunction = {addPerson}
      />
      {rows()}
    </div>
  )
}

export default App