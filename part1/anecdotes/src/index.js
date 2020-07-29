import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Display = ({toShow}) => {
  return (
    <p>
      {toShow}
    </p>
  )
}
const MostVotes = ({votes, anecdotes}) => {
  let arr = Object.values(votes)
  let max = Math.max(...arr)
  let getIndex = (votes, max) => Object.keys(votes).find(key => votes[key] === max)
  console.log(max, votes)
  return (
    <>
      <p>{anecdotes[getIndex(votes, max)]}</p>
      <p>has {max} votes</p>
    </>
  )
}
const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const randomState = max => Math.floor(Math.random() * Math.floor(max))
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))
  
  const addVote = () => {
    const copyPoints = {...votes}
    copyPoints[selected] += 1
    setVote(copyPoints)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Display toShow={anecdotes[selected]} />
      <Display toShow={"Has " + votes[selected] + " votes"} />
      <Button handleClick={() => addVote(selected)} text={"Vote"}/>
      <Button handleClick={() => setSelected(randomState(anecdotes.length))} text={"Next Anecdote"}/>
      <h2>Anecdote with most votes</h2>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

