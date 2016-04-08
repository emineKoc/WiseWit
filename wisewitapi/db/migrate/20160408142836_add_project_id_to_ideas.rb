class AddProjectIdToIdeas < ActiveRecord::Migration
  def change
    add_reference :ideas, :project, index: true, foreign_key: true
  end
end
