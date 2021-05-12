import React, { useState, useEffect } from "react"
import Select from "react-select"
import _ from "lodash"
import { fetchDecks } from "../../apiClient"
import ErrorList from "../ErrorList"

const GameOptionsForm = props => {
  const { submittedHandler } = props

  const [gameOptions, setGameOptions] = useState({
    difficulty: null,
    deck: {}
  })
  const [decks, setDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState([])
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetchDecks().then((parsedDeckData) => {
      setDecks(parsedDeckData)
    })
  }, [])

  const validFormSubmission = () => {
    let submitErrors = {}
    if (gameOptions.difficulty === null) {
      submitErrors = {
        ...submitErrors,
        ["difficulty"]: "is blank. Please choose a game difficulty."
      }
    }

    if (_.isEmpty(gameOptions.deck)) {
      submitErrors = {
        ...submitErrors,
        ["deck"]: "is blank. Please choose a deck to play with."
      }
    }

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleDifficultyClick = event => {
    setGameOptions({
      ...gameOptions,
      ["difficulty"]: event.currentTarget.value
    })
  }

  const handleSelectChange = (selectedDeck) => {
    setSelectedDeck(selectedDeck)
    let deckIndex = decks.findIndex((deck) => deck.name == selectedDeck.value)
    setGameOptions({
      ...gameOptions,
      ["deck"]: decks[deckIndex]
    })
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

  const startGame = event => {
    event.preventDefault()
    if (validFormSubmission()) {
      submittedHandler(gameOptions)
    }
  }

  let easyButton = <button className="game-button" value={5} name="easy" value={5} onClick={handleDifficultyClick}>EASY (5)</button>
  let mediumButton = <button className="game-button" value={10} name="medium" onClick={handleDifficultyClick}>MEDIUM (10)</button>
  let hardButton = <button className="game-button" value={15} name="hard" onClick={handleDifficultyClick}>HARD (15)</button>

  if (gameOptions.difficulty === "5") {
    easyButton = <button className="game-button difficulty-selected" value={5} name="easy" value={5} onClick={handleDifficultyClick}>EASY (5)</button>
  } else if (gameOptions.difficulty === "10") {
    mediumButton = <button className="game-button difficulty-selected" value={10} name="medium" onClick={handleDifficultyClick}>MEDIUM (10)</button>
  } else if (gameOptions.difficulty === "15") {
    hardButton = <button className="game-button difficulty-selected" value={15} name="hard" onClick={handleDifficultyClick}>HARD (15)</button>
  }

  return (
    <div className="game-form">
      <h1>Game Options</h1>
      <ErrorList errors={errors} />
      <div className="difficulty">
        <label className="game-header">Game Difficulty</label>
        {easyButton}
        {mediumButton}
        {hardButton}
      </div>
      <div className="deck-select">
        <label className="game-header">Select your deck:</label>
        <Select
          closeMenuOnSelect={true}
          value={selectedDeck}
          onChange={handleSelectChange}
          name="decks"
          options={options}
        />
      </div>
      <input className="game-button" type="submit" value="START GAME" onClick={startGame}></input>
    </div>
  )
}

export default GameOptionsForm