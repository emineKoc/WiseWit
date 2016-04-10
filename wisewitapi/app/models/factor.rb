class Factor < ActiveRecord::Base
  validates :name, presence: true
  validates :category, presence: true
  belongs_to :project
end
