class Group < ApplicationRecord
	has_many :messages
	has_many :group_users
	has_many :users, through: :group_users

	validates :name, presence: true

	def delete(current_user)
		other_users = self.users.select{|user| user != current_user}
	end
end
