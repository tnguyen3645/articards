import React from 'react'

const GameCardTile = (props) => {
  const { id, word, photo, isFlipped, cardClickHandler} = props

  let flippedCard = "card-section default"
  if (isFlipped) {
    flippedCard = "card-section flipped"
  }

  const onClickHandler = event => {
    cardClickHandler(event.currentTarget.getAttribute("id"))
  }

  return (
    <div className="cell small-2">
        <div id={id}  onClick={onClickHandler} >
          <div className={flippedCard}>
            <h3>{word}</h3>
          </div>
        </div>
    </div>
  )
}

export default GameCardTile