class CreateFactors < ActiveRecord::Migration
  def change
    create_table :factors do |t|
      t.text :name
      t.string :type
      t.references :project, index: true, foreign_key: true
    end
  end
end
