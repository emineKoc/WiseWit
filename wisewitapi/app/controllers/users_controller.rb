class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update,:destroy]

  def index
    @users = User.all
    render json: @users
  end


  def create
    @user = User.new(user_params)

    if @user.save
      payload = {token: {id: @user.id, email: @user.email} }
      token = JWT.encode payload, 'secret', 'HS256'

      render json: {data: token }
    else
    end
  end

  def show
    render json: @user
  end

  def login
      @user = User.find_by(email: params[:user][:email])
      if @user && @user.authenticate(params[:user][:password])
        payload = {token: {id: @user.id, email: @user.email} }
        token = JWT.encode payload, 'secret', 'HS256'

        render json: {token: token}

        decoded_token = JWT.decode token, 'secret', true, { :algorithm => 'HS256' }
        puts decoded_token
      end
    end

  private

  def user_params
    params.require(:user).permit(:name ,:email, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
