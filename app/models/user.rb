class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,  :validatable
  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users

  def self.search_for_group(params)
    where("name LIKE(?)", "%#{params[:keuword]}%").where.not(id: params[:user_ids])
  end
end