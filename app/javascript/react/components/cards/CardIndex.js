import React, { useState, useEffect } from "react"

import CardList from "./CardList"
import NewCardForm from "./NewCardForm"
import { fetchCards, postCard } from "../../apiClient"
import getCurrentUser from "../../getCurrentUser"

const CardIndex = props => {
  const [currentUser, setCurrentUser] = useState(null)
  const [cards, setCards] = useState([])
  const [userCards, setUserCards] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchCards().then((parsedCardData) => {
      setCards(parsedCardData)
    })
  }, [])

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user != undefined) {
        setCurrentUser(user)
        setUserCards(user.cards)
      }
    })
  }, [])

  const submittedHandler = card => {
    postCard(card).then((parsedCardData) => {
      setCards(cards => cards.concat(parsedCardData))
      setUserCards(cards => cards.concat(parsedCardData))
    })
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.currentTarget.value)
  }

  const dynamicSearch = () => {
    return cards.filter(card => card.word.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  let userMessage
  let cardForm
  if (currentUser === null) {
    userMessage = <p className="user-message center">Log in to see and create your own custom word cards!</p>
  } else {
    userMessage = <CardList cards={userCards} />
    cardForm = <NewCardForm submittedHandler={submittedHandler}/>
  }

  return (
    <div className="page-container">
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell small-12 medium-4">
            <h1 className="center page-header">Word Cards</h1>
            <div className="search__container">
              <p className="search__title">Search for a word card</p>
              <input className="search__input" type="text" placeholder="Search" onChange={handleSearchInputChange}></input>
            </div>
            {cardForm}
          </div>
          <div className="cell small-12 medium-8">
            <h2 className="center page-header">My Word Cards</h2>
            {userMessage}
            <h2 className="center page-header">All Word Cards</h2>
            <CardList cards={dynamicSearch()} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default CardIndex