import React, { useState, useEffect } from "react"

import DeckList from "./DeckList"

const DeckIndex = props => {
  const [decks, setdecks] = useState([])
  const [userDeckList, setUserDeckList] = useState([])

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

  return (
    <div className="grid-container">
      <h1>Word Decks</h1>
      <div className="search__container">
        <p className="search__title">
          Find a word deck
        </p>
        <input className="search__input" type="text" placeholder="Search"></input>
      </div>
      <div>
        <h2>My Word Decks</h2>
        <DeckList decks={userDeckList} />
        <h2>All Word Decks</h2>
        <DeckList decks={decks} />
      </div>
    </div>
  )
}

export default DeckIndex