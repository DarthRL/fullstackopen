const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.name} {props.exercises}</p>
  </>
)

const Content = (props) => (
  <>
    <Part name={props.parts[0]["name"]} exercises={props.parts[0]["exercises"]} />
    <Part name={props.parts[1]["name"]} exercises={props.parts[1]["exercises"]} />
    <Part name={props.parts[2]["name"]} exercises={props.parts[2]["exercises"]} />
  </>
)

const Total = function ({ parts }) {
  const total = parts.reduce((s, p) => s + p["exercises"], 0)
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
