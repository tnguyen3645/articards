import React from 'react'

const DeckTile = (props) => {
  const { id, name, cardCount, sampleWords } = props

  return (
    <div className="cell small-6 medium-4">
        <div className="card deck-card">
            <h1>{name}</h1>
            <div className="card-section deck-card-section">
              <h3>Number of Cards: {cardCount}</h3>
              <h3>Example words: {sampleWords.join(", ")}</h3>
            </div>
            <div className="card-section deck-card-section">
              <span>
                <button className="button alert">Edit Deck</button>
                <button className="button alert">Play!</button>
              </span>
            </div>
          </div>
    </div>
  )
}

export default DeckTile