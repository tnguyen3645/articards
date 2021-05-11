class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :cards

  has_many :cards, through: :card_decks
end