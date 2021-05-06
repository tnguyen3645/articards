import React from "react"

import CardTile from "./CardTile"

const CardList = props => {
  const { cards } = props

  const cardList = cards.map(card => {
    return <CardTile key={card.id} word={card.word} photo={card.photo_path} />
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {cardList}
      </div>
    </div>
  )
}

export default CardList