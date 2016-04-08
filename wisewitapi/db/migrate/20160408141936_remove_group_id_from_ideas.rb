class RemoveGroupIdFromIdeas < ActiveRecord::Migration
  def change
    remove_column :ideas, :group_id, :integer
  end
end
