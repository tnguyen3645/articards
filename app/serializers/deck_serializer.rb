class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :size

  has_many :cards
end