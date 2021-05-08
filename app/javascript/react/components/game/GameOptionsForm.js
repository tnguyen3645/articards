import React, { useState, useEffect } from "react"
import Select from "react-select"
import _ from "lodash"
import { fetchDecks } from "../../apiClient"

const GameOptionsForm = props => {
  const { submittedHandler } = props

  const [gameOptions, setGameOptions] = useState({
    difficulty: null,
    deck: {}
  })
  const [decks, setDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState([])

  useEffect(() => {
    fetchDecks().then((parsedDeckData) => {
      setDecks(parsedDeckData)
    })
  }, [])

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
    submittedHandler(gameOptions)
  }

  return (
    <div className="game-form">
      <h1>Game Options</h1>
      <div className="difficulty-buttons container">
        <label>Game Difficulty</label>
        <button className="game-button" value={5} name="easy" value={5} onClick={handleDifficultyClick}>EASY</button>
        <button className="game-button" value={10} name="medium" onClick={handleDifficultyClick}>MEDIUM</button>
        <button className="game-button" value={15} name="hard" onClick={handleDifficultyClick}>HARD</button>
      </div>

      <Select
        closeMenuOnSelect={true}
        value={selectedDeck}
        onChange={handleSelectChange}
        name="decks"
        options={options}
      />
      <input className="game-button" type="submit" value="START GAME" onClick={startGame}></input>
    </div>
  )
}

export default GameOptionsForm