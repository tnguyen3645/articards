import React from 'react'

const DictionaryTile = props => {
  const {id, word, photo, isSelected, cardClickHandler} = props

  const onClickHandler = event => {
    cardClickHandler(event.currentTarget.getAttribute("id"))
  }

  let selectedClass = "card"
  if (isSelected) {
    selectedClass = "card selected"
  }

  return (
    <div className="cell small-6 medium-2">
      <div id={id} className={selectedClass} onClick={onClickHandler}>
        <div className="card-section">
          <h3>{word}</h3>
        </div>
      </div>
    </div>
  )
}

export default DictionaryTile