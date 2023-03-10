# == Schema Information
#
# Table name: workspaces
#
#  id         :bigint    image.png       not null, primary key
#  name       :string           not null
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Workspace < ApplicationRecord
    validates :name, presence: true, uniqueness: {scope: :owner_id}

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User
    
    has_many :workspace_subscriptions,
        dependent: :destroy

    has_many :channels,
        dependent: :destroy
    
    has_many :users, 
        through: :workspace_subscriptions,
        source: :user,
        dependent: :destroy

    # has_many :messages,
    #     dependent: :destroy
end
