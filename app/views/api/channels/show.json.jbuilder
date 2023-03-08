json.channel do 
    json.extract! @channel, :id, :name, :description, :owner_id, :workspace_id
end

json.messages do
    @channel.messages.each do |message|
        json.set! message.id do 
            json.extract! message, :id, :text, :author_id, :messageable_type, :messageable_id, :updated_at
        end
    end
end