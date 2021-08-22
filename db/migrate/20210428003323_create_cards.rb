class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :word, null: false, uniqueness: true
      t.string :photo_path
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
