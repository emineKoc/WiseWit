class RenameColumnTypeinTableFactors < ActiveRecord::Migration
  def change
    rename_column :factors, :type, :category

  end
end
