import React from 'react'

const Search = ({onChange}) => {
    return (
      <div>
        Search countries: <input onChange={onChange} />
      </div>
    )
  }

export default Search