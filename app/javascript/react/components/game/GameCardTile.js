import React from 'react'
import ReactCardFlip from 'react-card-flip';

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
      <ReactCardFlip isFlipped={isFlipped} >
        <div id={id}  onClick={onClickHandler} >
          <div className="card-section default gamecard">
            <h3 className="center gamecard-text">Articards</h3>
          </div>
        </div>

        <div id={id} onClick={onClickHandler} >
          <div className="card-section flipped gamecard">
            <h3 className="center gamecard-text flipped-word">{word}</h3>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  )
}

export default GameCardTile