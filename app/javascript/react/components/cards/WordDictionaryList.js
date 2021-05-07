import React from "react"

import DictionaryTile from "./DictionaryTile"

const WordDictionaryList = props => {
  const { cards, selectedCards, selectCard } = props

  const cardClickHandler = (cardId) => {
    const clickedCard = cards.find((cardObj) => cardObj.id === parseInt(cardId))
    selectCard(clickedCard)
  }

  const dictionaryList = cards.map(card => {
    let isSelected = false
    if (selectedCards.includes(card.id)) {
      isSelected = true
    }
    return (
      <DictionaryTile
        key={card.id}
        id={card.id}
        word={card.word}
        photo={card.photo_path}
        isSelected={isSelected}
        cardClickHandler={cardClickHandler}
      />
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {dictionaryList}
      </div>
    </div>
  )
}

export default WordDictionaryList