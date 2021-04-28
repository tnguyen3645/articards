class CreateDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :decks do |t|
      t.string :name, null: false
      t.integer :size, null: false

      t.timestamps null: false
    end
  end
end
