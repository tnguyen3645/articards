import React, { useState, useEffect } from "react"

import GameCardList from "../game/GameCardList"
import GameOptionsForm from "./GameOptionsForm"

const GameBoard = props => {
  const [gameCards, setGameCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [completedCards, setCompletedCards] = useState([])
  const [countFlips, setCountFlips] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)

  const submittedHandler = (gameOptions) => {
    setFlippedCards([])
    setCompletedCards([])
    setCountFlips(0)
    let deckCards = gameOptions.deck.cards
    let difficulty = gameOptions.difficulty
    let boardCards = difficultySetting(difficulty, deckCards)
    setGameCards(duplicateCards(boardCards))
    setIsActive(true)
  }

  const difficultySetting = (difficulty, cards) => {
    let shuffledCards = [...cards].sort(() => Math.random() - 0.5)
    if (cards.length < difficulty) {
      return cards
    } else {
      return shuffledCards.splice(0, difficulty)
    }
  }

  const duplicateCards = (cards) => {
    let boardCards = []
    for(let i=0; i < cards.length; i++){
      let newGameCard = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        word: cards[i]["word"],
        photo: cards[i]["photo_path"],
        isFlipped: false
      }
      let newGameCardDuplicate = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        word: cards[i]["word"],
        photo: cards[i]["photo_path"],
        isFlipped: false
      }
      boardCards.push(newGameCard)
      boardCards.push(newGameCardDuplicate)
    }
    boardCards.sort(() => Math.random() - 0.5)
    return boardCards
  }

  const cardClick = (card) => {
    if (checkFlipped(flippedCards) || checkAlreadyFlipped(flippedCards, card)) {
      return
    }
    setCountFlips(countFlips + 1)
    const newFlippedCards = [...flippedCards, card]
    setFlippedCards(newFlippedCards)
    if (checkMatch(newFlippedCards)) {
      setCompletedCards([
        ...completedCards,
        newFlippedCards[0].word
      ])
    }
    if (checkFlipped(newFlippedCards)) {
      resetFlipped(1000)
    }
  }

  const checkFlipped = (flippedCards) => {
    return flippedCards.length === 2
  }

  const checkAlreadyFlipped = (flippedCards, card) => {
    return flippedCards.length === 1 && flippedCards[0].id === card.id
  }

  const checkMatch = (flippedCards) => {
    return flippedCards.length === 2 && flippedCards[0].word === flippedCards[1].word
  }

  const resetFlipped = (time) => {
    setTimeout(() => {
      setFlippedCards([])
    }, time)
  }

  const cardIsFlipped = (card) => {
    if (flippedCards.find(c => c.id === card.id) || completedCards.includes(card.word)) {
      return true
    } else {
      return false
    }
  }

  const updateGameCards = () => {
    const newGameCards = gameCards.map(card => ({
        ...card,
        ["isFlipped"]: cardIsFlipped(card)
    }))
    setGameCards(newGameCards)
  }

  useEffect(() => {
    updateGameCards()
  }, [flippedCards, completedCards, countFlips])

  return (
    <div className="grid-container">
      <GameOptionsForm submittedHandler={submittedHandler}/>
      <div className="gameboard-headers">
        <h2>Cards Flipped: {countFlips}</h2>
      </div>
      <div className="gameboard">
        <GameCardList cards={gameCards} cardClick={cardClick}/>
      </div>
    </div>
  )
}

export default GameBoard