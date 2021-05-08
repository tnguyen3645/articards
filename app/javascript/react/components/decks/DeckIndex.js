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
    <div className="grid-container">
      <div className="grid-x">
        <div className="cell small-12 medium-4">
          <h1>Word Decks</h1>
          <div className="search__container">
            <p className="search__title">Find a word deck</p>
            <input className="search__input" type="text" placeholder="Search" onChange={handleSearchInputChange}></input>
          </div>
          <Link to="/decks/new" className="button create">Create a new deck!</Link>
        </div>
      <div className="cell small-12 medium-8">
        <h2>My Word Decks</h2>
        <DeckList decks={userDeckList} />
        <h2>All Word Decks</h2>
        <DeckList decks={dynamicSearch()} />
      </div>
      </div>
    </div>
  )
}

export default DeckIndex