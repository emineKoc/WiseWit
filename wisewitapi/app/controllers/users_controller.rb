class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(user_params)

    if @user.save
      # payload = {token: {id: @user.id, email: @user.email} }
      # token = JWT.encode payload, 'secret', 'HS256'

      render json: {data: 'success' }
    else
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def login
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

    # def authorization
    #   secret = 'secret'
    #   token = request.headers["HTTP_AUTHORIZATION"]
    #   # got help from Caleb.https://github.com/Umbrellagun
    #   decoded_token = JWT.decode token, secret, true, { :algorithm => 'HS256' }
    #   expired = decoded_token[0]["exp"] <= Time.now.to_i
    #   # sends true if expired, false if not. Can the client side manipulate this?
    #   if expired
    #     render json: {
    #       expired:  expired,
    #       id:    "",
    #       email: ""
    #     }
    #   else
    #     render json: {
    #       expired: expired,
    #       id:    decoded_token[0]["token"]["id"],
    #       email: decoded_token[0]["token"]["email"]
    #     }
    #   end
    # end

  private

  def user_params
    params.require(:user).permit(:name ,:email, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
