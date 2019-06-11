import React from 'react'

const Filter = ({filterCriteria, changeHandler}) => {
  return (
    <form>
        <div>
          Rajaa näytettäviä
        </div>
        <input
          value={filterCriteria}
          onChange={changeHandler}  
        />
      </form>
  )
}

export default Filter