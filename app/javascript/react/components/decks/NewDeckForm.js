import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"
import { fetchCards } from "../../apiClient"
import DeckWords from "../decks/DeckWords"
import WordDictionaryList from "../cards/WordDictionaryList"
import ErrorList from "../ErrorList"

const NewDeckForm = props => {
  const [newDeck, setNewDeck] = useState({
    name: "",
    cardIds: []
  })
  const [selectedCards, setSelectedCards] = useState([])
  const [cards, setCards] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchCards().then((parsedCardData) => {
      setCards(parsedCardData)
    })
  }, [])

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name"]
    requiredFields.forEach(field => {
      if (newDeck[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleInputChange = event => {
    setNewDeck({
      ...newDeck,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const postDeck = async (formPayload) => {
    try {
      const response = await fetch("/api/v1/decks", {
        credentials: "same-origin",
        method: "POST",
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
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (validFormSubmission()) {
      postDeck(newDeck)
    }
  }

  const selectCard = (card) => {
    let newDeckCardIds
    if (newDeck.cardIds.includes(card.id)) {
      newDeckCardIds = newDeck.cardIds.filter(id => id != card.id)
      setNewDeck({
        ...newDeck,
        ["cardIds"]: newDeckCardIds
      })
      setSelectedCards(selectedCards => selectedCards.filter(c => c != card))
    } else {
      newDeckCardIds = newDeck.cardIds.concat(card.id)
      setNewDeck({
        ...newDeck,
        ["cardIds"]: newDeckCardIds
      })
      setSelectedCards(selectedCards => selectedCards.concat(card))
    }
  }

  if (shouldRedirect) {
    return <Redirect push to="/decks" />
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.currentTarget.value)
  }

  const dynamicSearch = () => {
    return cards.filter(card => card.word.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  return (
    <div className="page-container">
      <div className="grid-container">
        <ErrorList errors={errors} />
        <form onSubmit={onSubmitHandler}>
          <h1 className="center">Deck Name:</h1>
          <input className="center" type="text" name="name" placeholder="Enter deck name" onChange={handleInputChange}></input>
          <div className="deck-words center">
            <h1>Words in Deck:</h1>
            <DeckWords selectedCards={selectedCards} />
          </div>
          <input className="action-button" type="submit" value="Create new deck"></input>
        </form>
        <h2>Select Words for Deck:</h2>
        <div className="search__container">
          <input className="search__input" type="text" placeholder="Search" onChange={handleSearchInputChange}></input>
        </div>
        <div>
          <WordDictionaryList cards={dynamicSearch()} selectedCards={selectedCards} selectCard={selectCard} />
        </div>
      </div>
    </div>

  )
}

export default NewDeckForm