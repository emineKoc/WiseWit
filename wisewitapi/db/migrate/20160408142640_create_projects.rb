class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.references :user
      t.references :group
      t.timestamps
    end
  end
end
