import React from 'react'

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

const Content = ({ parts }) => (
  <>
    {parts.map(part => <Part name={part["name"]} exercises={part["exercises"]} />)}
  </>
)

const Total = function ({ parts }) {
  const total = parts.reduce((s, p) => s + p["exercises"], 0)
  return (
    <>
      <p>total of {total} exercises</p>
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

export default Course
