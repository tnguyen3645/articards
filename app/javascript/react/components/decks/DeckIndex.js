import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { fetchDecks } from "../../apiClient"
import DeckList from "./DeckList"
import getCurrentUser from "../../getCurrentUser"

const DeckIndex = props => {
  const [currentUser, setCurrentUser] = useState(null)
  const [decks, setDecks] = useState([])
  const [userDecks, setUserDecks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchDecks()
      .then((parsedDeckData) => {
        setDecks(parsedDeckData)
      })
      .then(() => {
        return getCurrentUser()
      })
      .then((userData) => {
        if (userData != undefined) {
          setCurrentUser(userData)
          setUserDecks(userData.decks)
        }
      })
  }, [])

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.currentTarget.value)
  }

  const dynamicSearch = () => {
    return decks.filter(deck => deck.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const deleteDeck = async deckId => {
    try {
      const response = await fetch(`api/v1/decks/${deckId}`,
      {
        credentials: "same-origin",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      throw new Error(errorMessage)
    }
    const responseBody = await response.json()
    setDecks(responseBody.decks)
    getCurrentUser().then((userData) => {
      setUserDecks(userData.decks)
    })
    } catch (err) {
      console.error(err)
    }
  }

  let userMessage
  let createButton
  if (currentUser === null) {
    userMessage = <p className="user-message center">Log in to see and create your own word decks!</p>
  } else {
    userMessage = <DeckList decks={userDecks} currentUser={currentUser} deleteDeck={deleteDeck}/>
    createButton = <Link to="/decks/new" className="action-button">Create a new deck!</Link>
  }

  return (
    <div className="page-container">
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell small-12 medium-4">
            <h1 className="center page-header">Word Decks</h1>
            <div className="search__container">
              <p className="search__title">Find a word deck</p>
              <input className="search__input" type="text" placeholder="Search" onChange={handleSearchInputChange}></input>
            </div>
            {createButton}
          </div>
          <div className="cell small-3 medium-8">
            <h2 className="center page-header">My Word Decks</h2>
            {userMessage}
            <h2 className="center page-header">All Word Decks</h2>
            <DeckList decks={dynamicSearch()} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default DeckIndex