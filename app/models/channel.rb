# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text
#  owner_id     :bigint           not null
#  workspace_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Channel < ApplicationRecord
    validates :name, :owner_id, :workspace_id, presence: true
    
    belongs_to :owner,
        class_name: :User
    
    belongs_to :workspace,
        class_name: :Workspace

    has_many :channel_subscriptions,
        dependent: :destroy
        
    has_many :users,
        through: :channel_subscriptions,
        dependent: :destroy

    # has_many :messages,
    #     dependent: :destroy
end
