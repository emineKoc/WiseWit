class Idea < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :project
end
