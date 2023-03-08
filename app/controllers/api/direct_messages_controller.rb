class Api::DirectMessagesController < ApplicationController
    private 

	def message_params 
		params.require(:direct_message).permit(:id, :workspace_id, :messages)
	end

end
