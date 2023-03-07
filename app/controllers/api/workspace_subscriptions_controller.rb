class Api::WorkspaceSubscriptionsController < ApplicationController
    def create
        @workspace_subscription = WorkspaceSubscription.new(workspace_subscription_params)
        @workspace = Workspace.find_by_id(params[:workspace_subscription][workspace_id])
        if @workspaces_subscription.save
            render :show
        else
            render json:@workspace_subscription.errors.full_messages, status: 422
        end
    end

    def destroy
        @workspace_subscription = WorkspaceSubscription.find_by_id(params[:workspace_subscription][workspace_id])
        if @workspace_subscription.user_id == current_user.id && @workspace_subscription.destroy
            @workspace_subscription.destroy
            render 'api/'
        else
            render json:@workspace_subscription.errors.full_messages, status: 422
        end
    end

    private
    def workspace_subscription_params
        params.require(:workspace_subscription).permit(:user_id, :workspace_id)
    end
end