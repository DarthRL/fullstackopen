import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        //setPersons(initialPersons.concat({ "name": "sss", "number": 111111, "id": 11111 }))
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const showMessage = (text, type) => {
    setMessage({ text: text, type: type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    //? alert(`${newName} is already added to phonebook`)
    if (persons.some(person => person["name"] === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        personService
          .update(id, { name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            showMessage(`Changed ${newName}`, "notification")
          })
          .catch(error => {
            showMessage(error.response.data.error, "error")
          })
      }
    }
    else personService
      .create({ name: newName, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showMessage(`Added ${newName}`, "notification")
      })
      .catch(error => {
        showMessage(error.response.data.error, "error")
      })
  }

  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person["name"].toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleDelete = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .catch(error => {
          const text = `Information of ${name} has already been removed from server`
          showMessage(text, "error")
        })
      setPersons(persons.filter(person => person.id !== id))
      showMessage(`Deleted ${name}`, "notification")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter text='filter shown with' filter={filter} handleOnChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDelete} />

    </div>
  )
}

export default App