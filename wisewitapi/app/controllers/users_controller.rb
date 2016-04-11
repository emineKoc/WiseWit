class UsersController < ApplicationController
  # skip_before_filter :authenticate_user_from_token!
  # before_filter :ensure_params_exist
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end


  def create
    @user = User.new(user_params)

    if @user.save
      # @auth_token = jwt_token(@user)
      # payload = {token: {id: @user.id, email: @user.email} }
      # token = JWT.encode payload, 'secret', 'HS256'

      render json: {data: 'success' }
    else
    end
  end

  # def authorization
  #   @user = User.new
  # end

  def show
    render json: @user
  end

  def login
    # @user = User.find_by(email: params[:user][:email])
    # return invalid_login_attempt unless @user
    # return invalid_login_attempt unless @user.valid_password?(user_params[:password])
    # @auth_token = jwt_token(@user)

      @user = User.find_by(email: params[:user][:email])
      if @user && @user.authenticate(params[:user][:password])
        exp = Time.now.to_i + 4 * 3600
        payload = {token: {id: @user.id, email: @user.email},  exp: exp }
        tokenX = JWT.encode payload, 'secret', 'HS256'

        render json: {token: tokenX}
      else
        render nothing: true, status: :unauthorized
      end


    end

  private

  def user_params
    params.require(:user).permit(:name ,:email, :password)
  end


  def set_user
        @user = User.find(params[:user_id])
  end


end
