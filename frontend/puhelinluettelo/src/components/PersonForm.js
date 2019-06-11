import React from 'react'

const PersonForm = ({name, number, nameHandler, numberHandler, addFunction}) => {
  return (
    <form onSubmit={addFunction}>
        <div>Nimi: </div>
        <input
          value={name}
          onChange={nameHandler}
        />
        <div>Numero: </div>
        <input
          value={number}
          onChange={numberHandler}
        />
        <div>
          <button type="submit">tallenna</button>
        </div>
      </form>
  )
}

export default PersonForm