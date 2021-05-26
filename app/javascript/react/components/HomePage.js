import React from "react"
import { Link } from "react-router-dom"

const HomePage = props => {
  return (
    <div className="home-container">
      <div className="home-row">
        <div className="home-col">
          <h1 className="home-title">Articards</h1>
          <h2 className="home-header">A Memory & Matching Game</h2>
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
      <footer className="footer">
        <div className="centered">
          <p className="footer-text"> Made with <ion-icon name="logo-react"></ion-icon> by Tony Nguyen 2021</p>
          <a href="https://www.linkedin.com/in/tonynguyen3645/"><ion-icon className="footer-icon" name="logo-linkedin"></ion-icon></a>
          <a href="https://github.com/tnguyen3645"><ion-icon className="footer-icon" name="logo-github"></ion-icon></a>
          <p className="footer-email"><a className="footer-email" href="mailto:tonynguyen3645@gmail.com">tonynguyen3645@gmail.com</a></p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage;