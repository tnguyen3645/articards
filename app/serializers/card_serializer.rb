class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :photo_path
end