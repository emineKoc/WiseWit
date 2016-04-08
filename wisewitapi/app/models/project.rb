class Project < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :user, :group
  has_many :ideas, :factors
end
