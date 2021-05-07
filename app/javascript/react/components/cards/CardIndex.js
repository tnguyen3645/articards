import React, { useState, useEffect } from "react"

import CardList from "./CardList"
import NewCardForm from "./NewCardForm"
import { fetchCards, postCard } from "../../apiClient"

const CardIndex = props => {
  const [cards, setCards] = useState([])
  const [userCards, setUserCards] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchCards().then((parsedDeckData) => {
      setCards(parsedDeckData)
    })
  }, [])

  const submittedHandler = card => {
    postCard(card).then((parsedCardData) => {
      setCards(cards => cards.concat(parsedCardData))
    })
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.currentTarget.value)
  }

  const dynamicSearch = () => {
    return cards.filter(card => card.word.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <input className="search__input" type="text" placeholder="Search" onChange={handleSearchInputChange}></input>
          </div>
          <NewCardForm submittedHandler={submittedHandler}/>
        </div>
        <div className="cell small-12 medium-8">
          <h2>My Word Cards</h2>
          <CardList cards={userCards} />
          <h2>All Word Cards</h2>
          <CardList cards={dynamicSearch()} />
        </div>
      </div>
    </div>
  )
}

export default CardIndex