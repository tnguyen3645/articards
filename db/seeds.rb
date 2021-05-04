# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

deck1 = Deck.create(name: "Initial K")
deck2 = Deck.create(name: "Initial SH")

card1 = Card.create(word: "cat")
card2 = Card.create(word: "car")
card3 = Card.create(word: "cow")
card4 = Card.create(word: "shed")
card5 = Card.create(word: "shears")
card6 = Card.create(word: "shaggy")

CardDeck.create(card: card1, deck: deck1)
CardDeck.create(card: card2, deck: deck1)
CardDeck.create(card: card3, deck: deck1)
CardDeck.create(card: card4, deck: deck2)
CardDeck.create(card: card5, deck: deck2)
CardDeck.create(card: card6, deck: deck2)