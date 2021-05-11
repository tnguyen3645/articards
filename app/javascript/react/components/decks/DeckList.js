import React from "react"
import _ from "lodash"

import DeckTile from "./DeckTile"

const DeckList = props => {
  const { decks, currentUser } = props

  const deckList = decks.map(deck => {
    if (deck.user === null) {
      const sampleWords = _.sampleSize(deck.cards, 3).map(card => card.word)

      return (
        <DeckTile
          key={deck.id}
          name={deck.name}
          cardCount={deck.cards.length}
          sampleWords={sampleWords}
          deckUser={deck.user}
          currentUser={currentUser}
        />
      )
    } else {
      return
    }
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