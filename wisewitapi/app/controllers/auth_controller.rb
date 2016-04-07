class AuthController < ApplicationController
  def authenticate
    # You'll need to implement the below method. It should return the
    # user instance if the username and password are valid.
    # Otherwise return nil.
    user = User.find_by_credentials(params[:email], params[:password])
    if user
      render json: authentication_payload(user)
    else
      render json: { errors: ['Invalid email or password'] }, status: :unauthorized
    end
  end

  private

  def authentication_payload(user)
    return nil unless user && user.id
    {
      auth_token: AuthToken.encode({ user_id: id }),
      user: { id: user.id, email: user.email, name: user.name } # return whatever user info you need
    }
  end
end
