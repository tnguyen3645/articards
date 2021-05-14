import React, { useState } from 'react'
import { Redirect } from "react-router-dom"

const JoinGameForm = props => {
  const [gameCode, setGameCode] = useState("")
  const [gameRoomValid, setGameRoomValid] = useState(0)

  const handleInputChange = (event) => {
    event.preventDefault()
    setGameCode(event.currentTarget.value.trim())
  }

  const fetchGame = async () => {
    try {
      const response = await fetch(`/api/v1/games/${gameCode}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      if (responseBody["games"].length === 0) {
        return false
      }
      return true
    } catch(error) {
        return false
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    fetchGame()
      .then((gameBool) => {
        debugger
        if (gameBool) {
          setGameRoomValid(1)
        } else {
          setGameRoomValid(2)
        }
      })
  }

  let notValidMessage
  if (gameRoomValid === 1) {
    return <Redirect to={`/games/${gameCode}`} />
  } else if (gameRoomValid === 2) {
    notValidMessage = <h2>Game room not found!</h2>
  }

  return (
    <div>
      <form className="center" onSubmit={onSubmitHandler}>
        <h1>Enter game room code below:</h1>
        <input className="center" type="text" placeholder="Enter Game Code" onChange={handleInputChange}></input>
        <button className="game-button" type="submit">Join</button>
      </form>
      {notValidMessage}
    </div>
  )
}

export default JoinGameForm