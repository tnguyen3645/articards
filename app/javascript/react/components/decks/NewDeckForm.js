import React, { useState, useEffect } from "react"
import _ from "lodash"

import ErrorList from "../ErrorList"

const NewDeckForm = props => {
  const [selectedCards, setSelectedCards] = useState([])

  return (
    <div>
      <CardList cards={cards} />
    </div>
  )
}

export default NewDeckForm