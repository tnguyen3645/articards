import React, { useState, useEffect } from "react"

import DeckTile from "./DeckTile"

const DeckIndex = props => {
  const [decks, setdecks] = useState([])

  const fetchdecks = async () => {
    try {
      const response = await fetch("/api/v1/decks")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setdecks(responseBody.decks)
    } catch (err) {
      console.error("Error in fetch!")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchdecks()
  }, [])

  const deckList = decks.map(deck => {
    return <DeckTile key={deck.id} name={deck.name} size={deck.size} />
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        {deckList}
      </div>
    </div>
  )
}

export default DeckIndex