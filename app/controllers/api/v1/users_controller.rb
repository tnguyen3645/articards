class Api::V1::UsersController < ApplicationController
  def current
    if user_signed_in?
      render json: current_user, serializer: UserSerializer
    else
      render json: {}
    end
  end
end