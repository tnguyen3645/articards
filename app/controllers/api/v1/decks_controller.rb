class Api::V1::DecksController < ApiController
  def index
    render json: Deck.all
  end

  def show
    deck = Deck.find(params[:id])
    render json: deck
  end
end