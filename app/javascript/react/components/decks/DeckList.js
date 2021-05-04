import React from "react"

import DeckTile from "./DeckTile"

const DeckList = props => {
  const { decks } = props

  const deckList = decks.map(deck => {
    return <DeckTile key={deck.id} name={deck.name} size={deck.size} />
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {deckList}
      </div>
    </div>
  )
}

export default DeckList