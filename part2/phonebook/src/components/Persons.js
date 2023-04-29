const Person = ({ person, onDelete }) => (
    <p>{person["name"]} {person["number"]} <button onClick={() => onDelete(person.id)}>delete</button></p>
)

const Persons = ({ persons, onDelete }) => (
    <div>
        {persons.map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
    </div>
)
export default Persons