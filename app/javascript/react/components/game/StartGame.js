import React, { useState } from 'react'

import GameOptionsForm from "../game/GameOptionsForm"
import JoinGameForm from "../game/JoinGameForm"

const StartGame = props => {
  const [renderView, setRenderView] = useState(0)

  const onClickHandler = (event) => {
    event.preventDefault()
    setRenderView(event.currentTarget.value)
  }

  let view
  if (renderView === "1") {
    view = <GameOptionsForm />
  } else if (renderView === "2") {
    view = <JoinGameForm />
  }

  return (
    <div className="center" >
      <h1>PLAY!</h1>
      <button className="start-game-button center" value="1" onClick={onClickHandler}>Start New Game</button>
      <button className="start-game-button center" value="2" onClick={onClickHandler}>Join Game</button>
      {view}
    </div>
  )
}

export default StartGame