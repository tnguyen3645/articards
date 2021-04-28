class Deck < ApplicationRecord
  has_many :cards

  validates :name, presence: true
  validates :size, presence: true
end