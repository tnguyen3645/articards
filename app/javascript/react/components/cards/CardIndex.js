import React, { useState, useEffect } from "react"

import CardTile from "./CardTile"

const CardIndex = props => {
  const [cards, setCards] = useState([])

  const fetchCards = async () => {
    try {
      const response = await fetch("/api/v1/cards")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setCards(responseBody.cards)
    } catch (err) {
      console.error("Error in fetch!")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const cardList = cards.map(card => {
    return <CardTile key={card.id} name={card.name} photo={card.photo_path} />
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {cardList}
      </div>
    </div>
  )
}

export default CardIndex