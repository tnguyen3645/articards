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
    <div className="grid-container form">
      <ErrorList errors={errors} />
      <form onSubmit={onSubmitHandler}>
        <label>Deck Name:
          <input type="text" name="name" placeholder="Enter deck name" onChange={handleInputChange}></input>
        </label>
        <div className="deck-words center">
          <h2>Words in Deck:</h2>
          <DeckWords selectedCards={selectedCards} />
        </div>
        <input type="submit" className="button" value="Create new deck"></input>
      </form>
      <h2>Select Words for Deck:</h2>
      <div className="search__container">
        <input className="search__input" type="text" placeholder="Search" onChange={handleSearchInputChange}></input>
      </div>
      <div>
        <WordDictionaryList cards={dynamicSearch()} selectedCards={selectedCards} selectCard={selectCard} />
      </div>
    </div>
  )
}

export default NewDeckForm