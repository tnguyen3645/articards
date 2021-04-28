class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :name, null: false
      t.string :photo_path

      t.belongs_to :deck

      t.timestamps null: false
    end
  end
end
