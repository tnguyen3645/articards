import React from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"

import CardIndex from "./cards/CardIndex"
import DeckIndex from "./decks/DeckIndex"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cards" component={CardIndex}/>
        <Route exact path="/decks" component={DeckIndex}/>
        <Route path="/" component={CardIndex}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App