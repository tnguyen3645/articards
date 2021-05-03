class Api::V1::CardsController < ApiController
  def index
    render json: Card.all
  end
end