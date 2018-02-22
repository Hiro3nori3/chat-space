class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable
  has_many :messages
  has_many :groups, through: :group_users
  has_many :group_users

  scope :exclude , -> (user){ where.not(id: user.id )}

end
