class CreateIdea < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.references :user
      t.references :group
      t.string :name
      t.timestamps
    end
  end
end
