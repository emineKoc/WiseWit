class Group < ActiveRecord::Base
    validates :name, presence: true
    has_and_belongs_to_many :users
    has_many :projects
end
