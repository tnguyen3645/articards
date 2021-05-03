# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

deck1 = Deck.create(name: "Initial K", size: 25)
deck2 = Deck.create(name: "Initial SH", size: 25)

Card.create(name: "cat", deck: deck1)
Card.create(name: "car", deck: deck1)
Card.create(name: "cow", deck: deck1)
Card.create(name: "shed", deck: deck2)
Card.create(name: "shears", deck: deck2)