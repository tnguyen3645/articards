import React from 'react'

const DeckTile = (props) => {
  const { name, size } = props

  return (
    <div className="cell small-6 medium-4">
        <div className="card">
          <div className="card-section">
            <h3>
              {name}
              Size: {size}
            </h3>
          </div>
        </div>
    </div>
  )
}

export default DeckTile