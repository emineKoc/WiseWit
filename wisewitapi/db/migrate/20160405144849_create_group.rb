class CreateGroup < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.references :user
      t.string :name
      t.string :members , array: true , default: []
      t.text :description
      t.timestamps
    end
  end
end
