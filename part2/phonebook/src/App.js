import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        //setPersons(initialPersons.concat({ "name": "aaa", "number": 111111, "id": 11111 }))
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person => person["name"] === newName)
      ? alert(`${newName} is already added to phonebook`)
      : personService
        .create({ name: newName, number: newNumber })
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
  }

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person["name"].toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personService
        .deletePerson(id)
        .catch(alert(`${persons.find(person => person.id === id).name} doesn't exist`))
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' filter={filter} handleOnChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDelete} />

    </div>
  )
}

export default App