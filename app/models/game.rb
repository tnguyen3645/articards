class Game < ApplicationRecord
  validates :game_room_code, presence: true
  validates :difficulty, presence: true

  belongs_to :deck
end