import React from 'react'

const DeckTile = (props) => {
  const { id, name, cardCount, sampleWords } = props

  return (
    <div className="cell small-6 medium-4">
        <div className="deck-card">
            <h1 className="center card-heading">{name}</h1>
            <div className="deck-card-section">
              <p className="card-text">Number of Cards: {cardCount}</p>
              <p className="card-text">Example words:</p>
              <p className="card-text">{sampleWords.join(", ")}</p>
            </div>
            <div className="card-section deck-card-section">
              <span>
                <button className="card-button">Play!</button>
                <button className="card-button">Edit Deck</button>
              </span>
            </div>
          </div>
    </div>
  )
}

export default DeckTile