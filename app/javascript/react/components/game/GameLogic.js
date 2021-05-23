export const checkFlipped = (flippedCards) => {
  return flippedCards.length === 2
}

export const difficultySetting = (difficulty, cards) => {
  let shuffledCards = [...cards].sort(() => Math.random() - 0.5)
  if (cards.length < difficulty) {
    return cards
  } else {
    return shuffledCards.splice(0, difficulty)
  }
}

export const duplicateCards = (cards) => {
  let boardCards = []
  for(let i=0; i < cards.length; i++){
    let newGameCard = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      word: cards[i]["word"],
      photo: cards[i]["photo_path"],
      isFlipped: false
    }
    let newGameCardDuplicate = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      word: cards[i]["word"],
      photo: cards[i]["photo_path"],
      isFlipped: false
    }
    boardCards.push(newGameCard)
    boardCards.push(newGameCardDuplicate)
  }
  boardCards.sort(() => Math.random() - 0.5)
  return boardCards
}

export const checkAlreadyFlipped = (flippedCards, card) => {
  return flippedCards.length === 1 && flippedCards[0].id === card.id
}

export const checkMatch = (flippedCards) => {
  return flippedCards.length === 2 && flippedCards[0].word === flippedCards[1].word
}