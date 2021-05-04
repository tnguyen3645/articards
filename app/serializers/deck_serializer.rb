class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :user

  has_many :cards, through: :card_decks
end