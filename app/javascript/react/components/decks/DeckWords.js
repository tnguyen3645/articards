import React from "react"

const DeckWords = props => {
  const { selectedCards } = props

  let selectedWords = []
  selectedCards.forEach(card => {
    selectedWords.push(card.word)
  })

  return (
    <div className="word-container center">
      <ul>
        <li>{selectedWords.join(", ")}</li>
      </ul>
    </div>
  )
}

export default DeckWords