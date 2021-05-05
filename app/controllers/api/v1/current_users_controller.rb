class Api::V1::CurrentUsersController < ApplicationController
  def index
    render json: current_user
  end
end