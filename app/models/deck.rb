class Deck < ApplicationRecord
  belongs_to :user, optional: true
  has_many :games
  has_many :card_decks
  has_many :cards, through: :card_decks

  validates :name, presence: true
end