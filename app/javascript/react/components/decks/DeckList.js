import React from "react"
import _ from "lodash"

import DeckTile from "./DeckTile"

const DeckList = props => {
  const { decks, currentUser, deleteDeck } = props

  const deckList = decks.map(deck => {
    if (currentUser === null) {
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
    } else {
      const sampleWords = _.sampleSize(deck.cards, 3).map(card => card.word)

      const handleDeckDelete = () => {
        deleteDeck(deck.id)
      }

      return (
        <DeckTile
          key={deck.id}
          name={deck.name}
          cardCount={deck.cards.length}
          sampleWords={sampleWords}
          deckUser={deck.user}
          currentUser={currentUser}
          handleDeckDelete={handleDeckDelete}
        />
      )
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