class Factor < ActiveRecord::Base
  validates :name, presence: true
  validates :type, presence: true
  belongs_to :project
end
