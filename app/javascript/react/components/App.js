import React from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"

import CardIndex from "./cards/CardIndex"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cards" component={CardIndex}/>
        <Route path="/" component={CardIndex}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App