import React, { useState, useEffect } from "react"

import CardList from "./CardList"

const CardIndex = props => {
  const [cards, setCards] = useState([])
  const [userCards, setUserCards] = useState([])

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
      <h1>Word Cards</h1>
      <div className="search__container">
        <p className="search__title">
          Find a word card
        </p>
        <input className="search__input" type="text" placeholder="Search"></input>
      </div>
      <div>
        <h2>My Word Cards</h2>
        <CardList cards={userCards} />
        <h2>All Word Cards</h2>
        <CardList cards={cards} />
      </div>
    </div>
  )
}

export default CardIndex