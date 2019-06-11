import React from 'react'

const Person = ({ person, removeFunction}) => {

  return (
    <div className = 'person'>
      <br></br>
      <div>{person.name}</div>
      <div>{person.number}</div>
      <button name = {person.name} value={person.id} onClick={removeFunction}> Delete</button>
    </div>
  )
}

export default Person