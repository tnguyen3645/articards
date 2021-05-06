import React, { useState } from "react"

import GameCardTile from "./GameCardTile"

const GameCardList = props => {
  const { cards, cardClick } = props

  const cardClickHandler = (cardId) => {
    const clickedCard = cards.find((cardObj) => cardObj.id === cardId)
    cardClick(clickedCard)
  }

  const cardList = cards.map(card => {
    return (
      <GameCardTile
        key={card.id}
        id={card.id}
        word={card.word}
        photo={card.photo_path}
        isFlipped={card.isFlipped}
        cardClickHandler={cardClickHandler}
      />
    )
  })


  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {cardList}
      </div>
    </div>
  )
}

export default GameCardList