class Card < ApplicationRecord
  belongs_to :user, optional: true

  has_many :card_decks
  has_many :decks, through: :card_decks

  validates :word, presence: true
end