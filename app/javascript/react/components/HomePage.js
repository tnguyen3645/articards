import React from "react"
import { Link } from "react-router-dom"

import CardTile from "./cards/CardTile"

const HomePage = props => {
  return (
    <div className="home-container">
      <div className="home-row">
        <div className="home-col">
          <h1 className="home-title">Articards</h1>
          <h2>A Memory & Matching Game</h2>
          <Link to='/play' className="play-button">PLAY NOW!</Link>
        </div>
        <div className="home-col">
          <div className="home-card">
          </div>
          <div className="home-card">
          </div>
          <div className="home-card">
          </div>
          <div className="home-card">
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;