# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  text             :text             not null
#  author_id        :bigint           not null
#  messageable_type :string
#  messageable_id   :bigint
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
    validates :text, :author_id, presence: true

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
        
    belongs_to :messageable, polymorphic: true
    
end
