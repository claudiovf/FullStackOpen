import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  return(
  <> 
    <h1>{props.course}</h1>
  </>
  )
}
const Content = (props) => {

  return (
    <>
      <Part items={props} />
    </>
  )
}
const Part = (props) => {
  const display = props.items.parts.map(item => {
    return <p key={item.name}>{item.name} {item.exercises}</p>
    
  })
  return(
    <>
      {display}
    </>  
  )
}
const Total = (props) => {

  let totalExer = 0
  props.parts.forEach(element => {
    totalExer += element.exercises
  });
  return (
    <>
      <p>Number of exercises {totalExer}</p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}  />
    </div>  
  )
}



ReactDOM.render(<App />, document.getElementById('root'));


