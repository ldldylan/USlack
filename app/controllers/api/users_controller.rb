class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def create
    
    # render json: user_params
    
    # instantiate a new User instance, passing in user_params, and save it to @user
    # try to save this @user to the database with @user.save
    # if @user.save returns a true (i.e., the @user was saved to the database):
    # login @user
    # render @user as JSON
    # if @user.save returns false (i.e., the @user failed your validations):
    # render { errors: @user.errors.full_messages } as JSON, with a status of :unprocessable_entity

    @user = User.new(user_params)
    @user.display_name = @user.email.split('@')[0]
    if @user.save
      login!(@user)
      # render json: { user: @user }
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :display_name, :title, :status)
  end
end
