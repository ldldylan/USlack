class Api::WorkspacesController < ApplicationController
    before_action :require_logged_in
    def index
        @workspaces = current_user.wortspaces
    end

    def show
        @workspace = Workspace.find_by(id: params[:id])
        render :show
    end

    def create
        @workspace = Workspace.new(workspace_params)
        @workspace.owner_id = current_user.id
        @channel_general = Channel.new(name: 'general', description: 'This is the one channel that will always include everyone. It’s a great spot for announcements and team-wide conversations.', owner_id: current_user.id, workspace_id: @workspace.id)
        
        @channel_random = Channel.new(name: 'random', description: 'This channel is for... well, everything else. It’s a place for team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!', owner_id: current_user.id, workspace_id: @workspace.id)
        
        if @workspace.save && @channel_general.save && @channel_random.save
            params[:users].each do |user_id| 
                @workspace_subscription = WorkspaceSubscription.new(workspace_id: @workspace.id, user: user_id)
                @channel_general_subscription = ChannelSubscription.new(channel_id: @channel_general.id, user: user_id)
                @channel_random_subscription = ChannelSubscription.new(channel_id: @channel_random.id, user: user_id)
                @workspace_subscription.save
                @channel_general_subscription.save
                @channel_random_subscription.save
            end
            render :show
        else
            render json:@workspace.errors.full_messages, status: 422
        end
    end

    def update
        @workspace = Workspace.find_by(id: params[:id])
        if @workspace.update(workspace_params)
            render :show
        else
            render json:@workspace.errors.full_messages, status: 422
        end
    end

    def destroy
        @workspace = workspace.find_by(id: params[:id])
        if @workspace 
            if @workspace.owner_id == current_user.id 
                @workspace.destroy()
            else
                render json: {error: "Sorry, you are not the workspace owner."}, status: 422
            end
        else
            render json: @workspace.errors.full_messages, status: 422
        end
    end

    private 
    def workspace_params
        params.require(:workspace).permit(:name, :owner_id, :users)
    end
end
