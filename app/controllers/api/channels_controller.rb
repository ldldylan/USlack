class Api::ChannelsController < ApplicationController
    def show
        @channel = Channel.find_by_id(params[:id])
        # debugger
        render :show
    end
    
    def create
        # debugger
        @channel = Channel.new(channel_params)
        @channel.owner_id = current_user.id
        @channel.workspace_id = params[:workspace_id]
        @workspace = Workspace.find_by_id(@channel.workspace_id)
        @channel.messages = nil
        if @channel.save
            # debugger
            @workspace.users.each do |user| 
                @channel_subscription = ChannelSubscription.create(channel_id: @channel.id, user_id: user.id)
            end
            # ChannelSubscription.create(channel_id: @channel.id, user_id: current_user.id)
            render :show
        else
            render json:@channel.errors.full_messages, status: 422
        end
    end

    def update
        @channel = Channel.find_by(id: params[:id])
        if @channel.update(channel_params)
            render :show
        else
            render json:@channel.errors.full_messages, status: 422
        end
    end 

    def destroy        
        @channel = Channel.find_by(id: params[:id])
        if @channel 
            if @channel.owner_id == current_user.id 
                @channel.destroy()
            else
                render json: {error: "Sorry, you are not the channel owner."}, status: 422
            end
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :description, :owner_id, :workspace_id, :users)
    end
end



