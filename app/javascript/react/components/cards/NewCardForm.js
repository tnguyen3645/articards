import React, { useState, useEffect } from "react"
import Select from "react-select"
import makeAnimated from 'react-select/animated';
import _ from "lodash"

import ErrorList from "../ErrorList"
import { fetchDecks } from "../../apiClient"

const NewCardForm = props => {
  const { submittedHandler } = props

  const [newCard, setNewCard] = useState({
    word: "",
    photo_path: "",
    decks: {}
  })
  const [errors, setErrors] = useState({})
  const [decks, setDecks] = useState([])
  const [selectedDecks, setSelectedDecks] = useState([])

  useEffect(() => {
    fetchDecks().then((parsedDeckData) => {
      setDecks(parsedDeckData)
    })
  }, [])

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["word"]
    requiredFields.forEach(field => {
      if (newCard[field].trim() === "") {
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
    setNewCard({
      ...newCard,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (validFormSubmission()) {
      submittedHandler(newCard)
      setNewCard({
        word: "",
        photo_path: "",
        deck: {}
      })
      setSelectedDecks([])
    }
  }

  const options = []
  for(let i=0; i < decks.length; i++){
    let deckName = decks[i].name
    let optionObj = {
      value: deckName,
      label: deckName
    }
    options.push(optionObj)
  }

  const animatedComponents = makeAnimated();

  const handleSelectChange = (selectedOptions) => {
    setNewCard({
      ...newCard,
      ["decks"]: selectedOptions
    })
    setSelectedDecks(selectedOptions)
  }

  return (
    <div className="callout card-form">
      <h3>Add a new Card</h3>
      <form className="form" onSubmit={onSubmitHandler}>
        <ErrorList errors={errors} />
        <label>
          Word:
          <input
            type="text"
            name="word"
            placeholder="Enter word for card"
            onChange={handleInputChange}
            value={newCard.word}
          />
        </label>

        <label>
          Optionally add to deck:
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedDecks}
            onChange={handleSelectChange}
            name="decks"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </label>
        <input className="button" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default NewCardForm