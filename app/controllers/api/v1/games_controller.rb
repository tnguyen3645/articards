class Api::V1::GamesController < ApiController
  def show
    game = Game.where({ game_room_code: params[:id] })
    render json: game
  end

  def create
    game = Game.new(game_params)
    deck = Deck.find(params["deck"]["id"])
    game.deck = deck

    if game.save
      render json: game
    else
      render json: { error: game.errors.full_messages }
    end
  end

  private

  def game_params
    params.require(:game).permit(:game_room_code, :difficulty)
  end
end