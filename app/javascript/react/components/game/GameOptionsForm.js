import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import Select from "react-select"
import _ from "lodash"
import { fetchDecks } from "../../apiClient"
import ErrorList from "../ErrorList"

const GameOptionsForm = props => {
  const [gameOptions, setGameOptions] = useState({
    difficulty: null,
    deck: {}
  })
  const [decks, setDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState([])
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [game, setGame] = useState(null)

  useEffect(() => {
    fetchDecks().then((parsedDeckData) => {
      setDecks(parsedDeckData)
    })
  }, [])

  const startGame = event => {
    event.preventDefault()
    if (validFormSubmission()) {
      const game_room_code = Math.random().toString(36).substr(2, 6);
      postNewGame(game_room_code)
    }
  }

  const postNewGame = async (game_room_code) => {
    try {
      const response = await fetch("/api/v1/games", {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          game_room_code: game_room_code,
          difficulty: gameOptions.difficulty,
          deck: gameOptions.deck
        })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setGame(responseBody["game"])
      setShouldRedirect(true)
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

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

  let easyButton = <button className="game-button" value={5} type="button" name="easy" value={5} onClick={handleDifficultyClick}>EASY (5)</button>
  let mediumButton = <button className="game-button" value={10} type="button" name="medium" onClick={handleDifficultyClick}>MEDIUM (10)</button>
  let hardButton = <button className="game-button" value={15} type="button" name="hard" onClick={handleDifficultyClick}>HARD (15)</button>

  if (gameOptions.difficulty === "5") {
    easyButton = <button className="game-button difficulty-selected" value={5} type="button" name="easy" value={5} onClick={handleDifficultyClick}>EASY (5)</button>
  } else if (gameOptions.difficulty === "10") {
    mediumButton = <button className="game-button difficulty-selected" value={10} type="button" name="medium" onClick={handleDifficultyClick}>MEDIUM (10)</button>
  } else if (gameOptions.difficulty === "15") {
    hardButton = <button className="game-button difficulty-selected" value={15} type="button" name="hard" onClick={handleDifficultyClick}>HARD (15)</button>
  }

  if (shouldRedirect) {
    return <Redirect to={`/games/${game.game_room_code}`} />
  }

  return (
    <form className="game-form" onSubmit={startGame}>
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
      <input className="game-button" type="submit" value="START GAME"></input>
    </form>
  )
}

export default GameOptionsForm