class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      render json: {data: 'success'}
    else
    end
  end

  def login
    @user = User.find(user_params)
    if @user.authenticate
      #generate a jwt token
      #send that token to user
      render json: {token: 'my-token'}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
