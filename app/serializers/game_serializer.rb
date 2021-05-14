class GameSerializer < ActiveModel::Serializer
  attributes :id, :game_room_code, :difficulty, :deck

  belongs_to :deck
end