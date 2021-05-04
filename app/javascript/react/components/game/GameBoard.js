import React, { useState, useEffect } from "react"

import CardList from "../cards/CardList"

const GameBoard = props => {
  const [gameCards, setGameCards] = useState([])
  const [deckName, setDeckName] = useState("")

  const fetchGameCards = async () => {
    const deckId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/decks/${deckId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setGameCards(responseBody.deck.cards)
      setDeckName(responseBody.deck.name)
    } catch (err) {
      console.error("Error in fetch!")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchGameCards()
  }, [])

  return (
    <div className="grid-container">
      <h1>{deckName}</h1>
      <h2>Cards Flipped:</h2>
      <h2>Timer: </h2>
      <div className="gameboard">
        <CardList cards={gameCards} />
      </div>
    </div>
  )
}

export default GameBoard