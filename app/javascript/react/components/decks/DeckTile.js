import React from 'react'
import { Link } from "react-router-dom"

const DeckTile = (props) => {
  const { id, name, size } = props

  return (
    <div className="cell small-6 medium-4">
      <Link to={`/play/${id}`}>
        <div className="card deck-card">
            <h1>{name}</h1>
            <div className="card-section deck-card-section">
              <h3>Number of Cards: {size}</h3>
            </div>
          </div>
      </Link>
    </div>
  )
}

export default DeckTile