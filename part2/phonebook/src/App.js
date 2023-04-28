import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "112233" }
  ])
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
      : setPersons(persons.concat({ name: newName, number: newNumber }))
  }

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person["name"].toLowerCase().includes(filter.toLowerCase()))
    : persons



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' filter={filter} handleOnChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>

    </div>
  )
}

export default App