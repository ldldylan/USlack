json.user do
    json.extract! @user, :id, :email, :created_at, :updated_at
end

json.workspaces do
    @user.workspaces.each do |workspace|
        json.set! workspace.id do
            json.extract! workspace, :id, :name, :owner_id
        end
    end
end

json.subscriptWorkspaces do
    @user.subscript_workspaces.each do |subscript_workspace|
    json.set! subscript_workspace.id do
            json.extract! subscript_workspace, :id, :name, :owner_id, :users, :channels
        end
    end
end

json.channels do
    @user.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :name, :description, :owner_id, :workspace_id
        end
    end
end

json.subscript_channels do
    @user.subscript_channels.each do |subscript_channel|
        json.set! subscript_channel.id do
            json.extract! subscript_channel, :id, :name, :workspace_id, :owner_id, :users
        end
    end
end