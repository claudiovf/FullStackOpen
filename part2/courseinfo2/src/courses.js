
import React from 'react'

const Header = (props) => {
    return(
    <> 
      <h3>{props.course}</h3>
    </>
    )
  }
  const Content = ({parts}) => {
    return (
      <>
        <Part items={parts} />
      </>
    )
  }
  const Part = ({items}) => {
    const display = items.map(item => {
      return <p key={item.name}>{item.name} {item.exercises}</p>
    })
    return(
      <>
        {display}
      </>  
    )
  }
  const Total = ({parts}) => {
    const totalExer = parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))
    return (
      <>
        <p><b>Total of exercises {totalExer.exercises}</b></p>
      </>
    )
  }
  
  const Courses = ({courses}) => {
    return (
      <div>
        <Header course={courses.name} />
        <Content parts={courses.parts} />
        <Total parts={courses.parts}  />
      </div>
    )
  }

  export default Courses