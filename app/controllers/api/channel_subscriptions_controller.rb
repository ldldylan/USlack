class Api::ChannelSubscriptionsController < ApplicationController
    def create
        @channel_subscription = ChannelSubscription.new(channel_subscription_params)
        @channel = Channel.find_by_id(params[:channel_subscription][channel_id])
        if @channels_subscription.save
            render :show
        else
            render json:@channel_subscription.errors.full_messages, status: 422
        end
    end

    def destroy
        @channel_subscription = ChannelSubscription.find_by_id(params[:channel_subscription][channel_id])
        if @channel_subscription.user_id == current_user.id && @channel_subscription.destroy
            @channel_subscription.destroy
            render 'api/'
        else
            render json:@channel_subscription.errors.full_messages, status: 422
        end
    end

    private
    def channel_subscription_params
        params.require(:channel_subscription).permit(:user_id, :channel_id)
    end
end
