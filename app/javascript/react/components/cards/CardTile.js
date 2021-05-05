import React from 'react'

const CardTile = (props) => {
  const {word, photo} = props

  return (
    <div className="cell small-6 medium-2">
        <div className="card">
          <div className="card-section">
            <h3>{word}</h3>
          </div>
        </div>
    </div>
  )
}

export default CardTile