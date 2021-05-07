class Api::V1::CardsController < ApiController
  def index
    render json: Card.all
  end

  def create
    card = Card.new(card_params)
    card.user = current_user

    if card.save
      if params["decks"] != {}
        params["decks"].each do |deck|
          deck = Deck.find_by(name: deck["value"])
          CardDeck.create(card: card, deck: deck)
        end
      end
      render json: card
    else
      render json: { error: card.errors.full_messages.to_sentence}
    end
  end

  private

  def card_params
    params.require(:card).permit(:word)
  end
end