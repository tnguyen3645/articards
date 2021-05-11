class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :decks, :cards

  has_many :cards
  has_many :decks
end