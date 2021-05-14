class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :game_room_code, null: false
      t.integer :difficulty, null: false
      t.belongs_to :deck

      t.timestamps null: false
    end
  end
end
