json.workspace do 
    json.extract! @workspace, :id, :name, :owner_id, :users
end

json.channels do
    @workspace.channels.each do |channel|
        json.set! channel.id do 
            json.extract! channel, :id, :name, :owner_id
        end 
    end
end

json.workspacesSubscription do
    @workspace.workspace_subscriptions do |workspace_subscription|
        json.set! workspace_subscription.user_id do 
            json.extract! workspace_subscription, :id, :user_id, :workspace_id
        end
    end
end

json.users do 
    @workspace.users.each do |user| 
        json.set! user.id do 
            json.extract! user, :id, :display_name, :email
        end
    end
end

json.subscriptChannels do 
    @subscript_channels.each do |subscript_channel|
        json.set! subscript_channel.id do 
            json.extract! subscript_channel, :id, :name, :workspace_id
        end
    end
end