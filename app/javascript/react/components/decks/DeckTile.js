import React from 'react'

const DeckTile = (props) => {
  const { name, cardCount, sampleWords, currentUser, deckUser, handleDeckDelete } = props

  const deleteClickHandler = event => {
    event.preventDefault()
    handleDeckDelete()
  }

  let deleteButton
  if (deckUser != null) {
    deleteButton = <button className="action-button delete" onClick={deleteClickHandler}>DELETE</button>
  }

  return (
    <div className="cell small-6 medium-4">
        <div className="deck-card">
            <h1 className="center card-heading">{name}</h1>
            <div className="deck-card-section">
              <p className="card-text">Number of Cards: {cardCount}</p>
              <p className="card-text">Example words:</p>
              <p className="card-text">{sampleWords.join(", ")}</p>
            </div>
            { deleteButton }
        </div>
    </div>
  )
}

export default DeckTile