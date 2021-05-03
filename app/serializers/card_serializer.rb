class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :photo_path

  belongs_to :deck
end