class Api::MessagesController < ApplicationController
    def show
		@message = Message.find_by_id(params[:id]) 
		render :show
	end

    def create
        # debugger
        @message = Message.new(message_params)
        @author = User.find_by(id: params[:author_id])
        
        if @message.save 
            # if @message.messageable_type === 'Channel'
            #     @message.save
            # elsif @message.messageable_type === 'DirectMessage'
            #     @message.save
            # end
            render :show
        else
            render json:@message.errors.full_messages, status: 422
        end

    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.update(message_params)
            render :show
        else
            render json:@message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        if @message
            if @message.author_id === current_user.id
                @message.destroy()
            else
                render json: {error: "Sorry, you are not the message author."}, status: 422
            end
        else
            render json: @message.error.full_messages, status: 422
        end
    end

    private 

	def message_params 
		params.require(:message).permit(:id, :text, :author_id, :messageable_type, :messageable_id, :created_at, :updated_at)
	end
end
