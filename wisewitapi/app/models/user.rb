class User < ActiveRecord::Base
  has_secure_password
  validates :email, presence: true, uniqueness: true
  has_many :projects
  has_and_belongs_to_many :groups
end
