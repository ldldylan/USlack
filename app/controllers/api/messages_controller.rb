class Api::MessagesController < ApplicationController
    def show
		@message = Message.find_by_id(params[:id]) 
		render :show
	end

    def create
        @message = Message.new(message_params)
        @author = User.find_by(id: params[:author_id])
        if @message.save 
            if @message.messageable_type === 'channel'
                
            else

            end
        end

    end

    def update
    end

    def destroy
    end

    private 

	def message_params 
		params.require(:message).permit(:id, :text, :author_id, :messageable_type, :messageable_id, :created_at, :updated_at)
	end
end
