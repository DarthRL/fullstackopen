import { useState } from 'react'
import Person from './components/Persons'

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

  const personsToShow = filter
    ? persons.filter(person => person["name"].toLowerCase().includes(filter.toLowerCase()))
    : persons


  const Filter = ({ text, handleOnChange }) => (
    <div>
      {text} <input value={filter} onChange={handleOnChange} />
    </div>
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' handleOnChange={handleFilterChange} />

      <div>
        Filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person["name"]} person={person} />)}

    </div>
  )
}

export default App