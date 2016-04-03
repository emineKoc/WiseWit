class UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      payload = {token: {id: @user.id, email: @user.email} }
      token = JWT.encode payload, 'secret', 'HS256'

      render json: {data: token }
    else
    end
  end

  def login
      @user = User.find_by(email: params[:user][:email])
      if @user && @user.authenticate(params[:user][:password])
        payload = {token: {id: @user.id, email: @user.email} }
        token = JWT.encode payload, 'secret', 'HS256'

        render json: {token: token}

        decoded_token = JWT.decode token, 'secret', true, { :algorithm => 'HS256' }
        binding.pry
        puts decoded_token
      end
    end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
