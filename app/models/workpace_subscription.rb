# == Schema Information
#
# Table name: workpace_subscriptions
#
#  id           :bigint           not null, primary key
#  workspace_id :bigint           not null
#  user_id      :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class WorkpaceSubscription < ApplicationRecord
    validates :user_id, :workspace_id, presence: true
    belongs_to :workspace
    belongs_to :user
end
