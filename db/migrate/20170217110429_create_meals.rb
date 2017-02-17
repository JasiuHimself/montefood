class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.string :name
      t.float :price
      t.references :order, index: true
      t.references :user, index: true
      t.timestamps
    end
  end
end
