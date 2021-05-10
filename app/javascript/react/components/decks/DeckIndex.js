import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { fetchDecks } from "../../apiClient"
import DeckList from "./DeckList"

const DeckIndex = props => {
  const [decks, setDecks] = useState([])
  const [userDeckList, setUserDeckList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchDecks().then((parsedDeckData) => {
      setDecks(parsedDeckData)
    })
  }, [])

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.currentTarget.value)
  }

  const dynamicSearch = () => {
    return decks.filter(deck => deck.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <Link to="/decks/new" className="action-button">Create a new deck!</Link>
          </div>
          <div className="cell small-3 medium-8">
            <h2 className="center page-header">My Word Decks</h2>
            <DeckList decks={userDeckList} />
            <h2 className="center page-header">All Word Decks</h2>
            <DeckList decks={dynamicSearch()} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default DeckIndex