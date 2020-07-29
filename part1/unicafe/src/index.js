import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Buttons = (props) => {
  return (
    <>
      <Button handleClick={props.btns[1]} text={props.btns[0]} />
      <Button handleClick={props.btns[3]} text={props.btns[2]} />
      <Button handleClick={props.btns[5]} text={props.btns[4]} /> 
    </>
  )
}
const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pct = (good / all) * 100
  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={avg} />
        <Statistic text="percentage" value={pct + '%'} />
      </tbody>
    </table>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setToValue = (value, setProp) => {
    setProp(value + 1)
  }
  let setGoodFunc = () => setToValue(good, setGood)
  let setNeutralFunc = () => setToValue(neutral, setNeutral)
  let setBadFunc = () => setToValue(bad, setBad)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Buttons btns={["good", setGoodFunc, "neutral", setNeutralFunc, "bad", setBadFunc]} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)