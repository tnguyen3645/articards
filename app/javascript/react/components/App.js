import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import CardIndex from "./cards/CardIndex"
import DeckIndex from "./decks/DeckIndex"
import GameBoard from "./game/GameBoard"
import HomePage from "./HomePage"
import NewDeckForm from "./decks/NewDeckForm"
import getCurrentUser from "../getCurrentUser"

export const App = (props) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cards" component={CardIndex} />
        <Route exact path="/decks" component={DeckIndex} />
        <Route exact path="/play" component={GameBoard} />
        <Route exact path="/decks/new" component={NewDeckForm} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App