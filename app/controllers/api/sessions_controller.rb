class Api::SessionsController < ApplicationController

  def show
    # if there is a current_user: render current_user as JSON, under a top-level key of user
    # if there is not a current_user: render { user: nil } as JSON
    if current_user
      @user = current_user
      # render json: { user: current_user }
      render 'api/users/show'
    else
      render json: {user:nil}
    end
  end

  def create
    # pass the credentials from the request body, stored under top level keys of credential and password, to User::find_by_credentials; save the result to @user
    # if a user with matching credentials was found (i.e., @user is truthy):
    #   login @user
    #   render @user as JSON, under a top-level key of user
    #   if no user was found (i.e., @user is falsey):
    #   render { errors: ['The provided credentials were invalid.'] } as JSON, with a status of :unauthorized
    @user = User.find_by_credentials(params[:credential], params[:password])
    if @user 
      login!(@user)
      # render json: {user: @user}
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    # log out the current_user, if one exists
    # render { message: 'success' } as JSON
    if current_user
      logout!
      render json: {message: 'success'}
    end
  end
end
