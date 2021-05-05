import React, { useState, useEffect } from "react"

import CardList from "./CardList"
import NewCardForm from "./NewCardForm"

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

  const postCard = async (formPayload) => {
    try {
      const response = await fetch("/api/v1/cards", {
        credentials: "same-origin",
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const newCard = await response.json()
      let cardsList = cards
      cardsList = cardsList.concat(newCard.card)
      setCards(cardsList)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const submittedHandler = card => {
    postCard(card)
  }

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="cell small-12 medium-4">
          <h1>Word Cards</h1>
          <div className="search__container">
            <p className="search__title">
              Search for a word card
            </p>
            <input className="search__input" type="text" placeholder="Search"></input>
          </div>
          <NewCardForm submittedHandler={submittedHandler}/>
        </div>
        <div className="cell small-12 medium-8">
          <h2>My Word Cards</h2>
          <CardList cards={userCards} />
          <h2>All Word Cards</h2>
          <CardList cards={cards} />
        </div>
      </div>
    </div>
  )
}

export default CardIndex