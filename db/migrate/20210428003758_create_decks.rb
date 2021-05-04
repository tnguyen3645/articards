class CreateDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :decks do |t|
      t.string :name, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
