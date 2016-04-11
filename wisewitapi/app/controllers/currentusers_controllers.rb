class CurrentUsersController < ApplicationController
  attr_reader :current_user
  def show
    if current_user
      head :ok
    else
      head :not_found
    end
  end
end
