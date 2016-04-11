class CreateFactors < ActiveRecord::Migration
  def change
    create_table :factors do |t|
      t.text :name
      t.string :type
      t.references :project, foreign_key: true
    end
  end
end
