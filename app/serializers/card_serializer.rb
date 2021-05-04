class CardSerializer < ActiveModel::Serializer
  attributes :id, :word, :photo_path, :user

  has_many :decks, through: :card_decks
  belongs_to :user
end