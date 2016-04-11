class Project < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :user
  belongs_to :group
  has_many :ideas
  has_many :factors
end
