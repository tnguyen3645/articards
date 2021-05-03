class Api::V1::DecksController < ApiController
  def index
    render json: Deck.all
  end
end