class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
            t.references :project
            t.string :name
            t.timestamps
    end
  end
end
