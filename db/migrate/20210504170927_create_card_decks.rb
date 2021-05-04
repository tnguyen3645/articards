class CreateCardDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :card_decks do |t|
      t.belongs_to :card, null: false
      t.belongs_to :deck, null: false

      t.timestamps null: false
    end
  end
end
