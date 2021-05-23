import React, { useState, useEffect } from "react"

import GameCardList from "../game/GameCardList"
import { fetchGame } from "../../apiClient"
import { checkFlipped, difficultySetting, duplicateCards, checkAlreadyFlipped, checkMatch } from "../game/GameLogic"

const GameBoard = props => {
  const [gameCards, setGameCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [completedCards, setCompletedCards] = useState([])
  const [countFlips, setCountFlips] = useState(0)
  const [stateUpdateFinished, setStateUpdateFinished] = useState(false)

  const gameRoomCode = props.match.params.id

  useEffect(() => {
    let gameRoomCode = props.match.params.id

    fetchGame(gameRoomCode)
      .then((parsedGameData) => {
        let boardCards = difficultySetting(parsedGameData.difficulty, parsedGameData.deck.cards)
        setGameCards(duplicateCards(boardCards))
      })

    App.gameChannel = App.cable.subscriptions.create(
      {
        channel: "GameChannel",
        game_id: gameRoomCode
      },
      {
        connected: () => console.log("User connected"),
        disconnected: () => console.log("User disconnected"),
        received: data => {
          handleGameStateChange(data)
        }
      }
    );
  }, [])

  useEffect(() => {
    updateGameCards()
  }, [flippedCards, completedCards])

  const cardClick = (card) => {
    if (checkFlipped(flippedCards) || checkAlreadyFlipped(flippedCards, card)) {
      return
    }
    setCountFlips(countFlips => countFlips + 1)
    const newFlippedCards = [...flippedCards, card]
    setFlippedCards(flippedCards => [...flippedCards, card])
    if (checkMatch(newFlippedCards)) {
      setCompletedCards(completedCards => [...completedCards, newFlippedCards[0].word])
    }
    if (checkFlipped(newFlippedCards)) {
      resetFlipped(1000)
    }
    setStateUpdateFinished(true)
  }

  const sendGameState = () => {
    App.gameChannel.send({
      gameCards: gameCards,
      flippedCards: flippedCards,
      completedCards: completedCards,
      countFlips: countFlips
    })
    setStateUpdateFinished(false)
  }

  const handleGameStateChange = (gameState) => {
    setGameCards(gameState.gameCards)
    setFlippedCards(gameState.flippedCards)
    setCompletedCards(gameState.completedCards)
    setCountFlips(gameState.countFlips)
  }

  if (stateUpdateFinished) {
    sendGameState()
  }

  const resetFlipped = (time) => {
    setTimeout(() => {
      setFlippedCards([])
      setStateUpdateFinished(true)
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

  return (
    <div className="page-container">
      <div className="grid-container">
        <div className="gameboard-headers">
          <h2 className="center">Cards Flipped: {countFlips}</h2>
          <h3 className="center gameboard-headers">Send game code to play with others: <span className="game-code">{gameRoomCode}</span></h3>
        </div>
        <div className="gameboard">
          <GameCardList cards={gameCards} cardClick={cardClick}/>
        </div>
      </div>
    </div>
  )
}

export default GameBoard