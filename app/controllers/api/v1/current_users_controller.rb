class Api::V1::CurrentUsersController < ApplicationController
  def index
    if user_signed_in?
      render json: current_user, serializer: CurrentUserSerializer
    else
      render json: {}
    end
  end
end