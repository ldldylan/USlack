json.channel do 
    json.extract! @channel, :id, :name, :description, :owner_id, :workspace_id
end
