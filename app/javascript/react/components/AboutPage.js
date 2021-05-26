import React from "react"

const AboutPage = props => {
  return (
    <div className="about-page-container">
      <h1 className="center about-page-title">About</h1>
      <div className="about-page-row">
        <div className="about-page-col">
          <div className="about-page-card">
            <h2 className="center about-page-header" >Why Articards?</h2>
          </div>
        </div>
        <div className="about-page-col">
          <p className="about-page-text">
          Articards is a simple memory and matching game for creating custom learning sessions in speech therapy.
          The name of the application comes from "Articulation Cards," which is a tool used in speech therapy sessions.
          With therapy sessions going online because of the COVID pandemic, Articards provides speech therapists with more
          tools to use online.
          </p>
          <h3>Features:</h3>
          <ul className="about-page-list">
            <li>Custom game sessions</li>
            <li>Classroom and online play</li>
            <li>No student accounts required</li>
            <li>Completely free to use</li>
            <li>New features still being added!</li>
          </ul>
        </div>
      </div>
      <div className="about-page-row">
        <div className="about-page-col">
          <div className="about-page-card">
            <h2 className="center about-page-header" >About the Developer</h2>
          </div>
        </div>
        <div className="about-page-col">
          <p className="about-page-text">
            Tony Nguyen has a background in biomedical engineering and industry experience in the biopharama
            and health tech space. He transitioned into software developement after graduating from Launch Academy
            in May 2021. He is now pursing a career in software development. He's passionate about creating innovative, mission-driven technologies
            that will disrupt and change the healthcare industry. Outside of coding, you'll find Tony cooking, playing guitar, or exploring the outdoors.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;