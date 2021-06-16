class Api::V1::DecksController < ApiController
  def index
    render json: Deck.all
  end

  def show
    deck = Deck.find(params[:id])
    render json: deck
  end

  def new
  end

  def create
    deck = Deck.new(deck_params)
    cards = []
    cardIds = params["cardIds"]
    cardIds.each do |cardId|
      card = Card.find(cardId)
      cards.push(card)
    end
    deck.cards = cards
    deck.user = current_user

    if deck.save
      render json: deck
    else
      render json: { error: deck.errors.full_messages }
    end
  end

  def destroy
    deck = Deck.find(params[:id])
    if deck.destroy
      render json: Deck.all
    else
      render json: { error: deck.errors.full_messages }
    end
  end

  private

  def deck_params
    params.require(:deck).permit(:name, :cards, :user)
  end
end