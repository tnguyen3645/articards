import React from 'react'

const GameCardTile = (props) => {
  const { id, word, photo, isFlipped, cardClickHandler} = props

  let flippedCard = "card-section default gamecard"
  let cardText = <h3 className="center gamecard-text">Articards</h3>
  if (isFlipped) {
    flippedCard = "card-section flipped gamecard"
    cardText = <h3 className="center gamecard-text flipped-word">{word}</h3>
  }

  const onClickHandler = event => {
    cardClickHandler(event.currentTarget.getAttribute("id"))
  }

  return (
    <div className="cell small-2">
      <div id={id}  onClick={onClickHandler} >
        <div className={flippedCard}>
          {cardText}
        </div>
      </div>
    </div>
  )
}

export default GameCardTile