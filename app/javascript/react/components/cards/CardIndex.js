import React, { useState, useEffect } from "react"

import CardList from "./CardList"

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

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <CardList cards={cards} />
      </div>
    </div>
  )
}

export default CardIndex