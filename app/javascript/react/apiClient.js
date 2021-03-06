export const fetchDecks = async () => {
  try {
    const response = await fetch("/api/v1/decks")
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    return responseBody.decks
  } catch (err) {
    console.error("Error in fetch!")
    console.error(err)
  }
}

export const fetchCards = async () => {
  try {
    const response = await fetch("/api/v1/cards")
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    return responseBody.cards
  } catch (err) {
    console.error("Error in fetch!")
    console.error(err)
  }
}

export const postCard = async (formPayload) => {
  try {
    const response = await fetch("/api/v1/cards", {
      credentials: "same-origin",
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formPayload)
    })
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      throw new Error(errorMessage)
    }
    const responseBody = await response.json()
    if (responseBody.error != undefined) {
      return responseBody
    } else {
      return responseBody.card
    }
  } catch (error) {
    console.error(`Error in Fetch: ${error.message}`)
  }
}

export const fetchGame = async (gameRoomCode) => {
  try {
    const response = await fetch(`/api/v1/games/${gameRoomCode}`)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      throw new Error(errorMessage)
    }
    const responseBody = await response.json()
    return responseBody["games"][0]
  } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
  }
}