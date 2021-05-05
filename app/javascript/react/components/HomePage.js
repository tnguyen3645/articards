import React from "react"

import CardTile from "./cards/CardTile"

const HomePage = props => {
  return (
    <div className="grid-container">
      <h1 className="home-title">Articards</h1>
      <p className="home-description">A Matching & Memory Game</p>
      <div className="grid-x">
        <div className="cell small-12 medium-6">
          <CardTile key={1} word="hello" photo="hello" />
          <CardTile key={1} word="hello" photo="hello" />
          <CardTile key={1} word="hello" photo="hello" />
        </div>

        <div className="cell small-12 medium-6">
          <button className="button alert home">PLAY NOW!</button>
          <button className="button alert home">SIGN UP</button>
          <button className="button alert home">SIGN IN</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage;