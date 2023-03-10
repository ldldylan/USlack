# == Schema Information
#
# Table name: workspace_subscriptions
#  id           :bigint           not null, primary key
#  workspace_id :bigint           not null
#  user_id      :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class WorkspaceSubscription < ApplicationRecord
    validates :user_id, :workspace_id, presence: true
    
    belongs_to :workspace,
        foreign_key: :workspace_id,
        class_name: :Workspace
        
    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
        
end
