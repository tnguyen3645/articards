require "rails_helper"

RSpec.describe Api::V1::GamesController, type: :controller do
  let!(:deck1) { Deck.create(
    name: "Initial K"
  )}

  let!(:game1) { Game.create(
    game_room_code: "abcdef",
    difficulty: 15,
    deck: deck1
  )}

  describe "GET#show" do
    it "should return an individual game with all its attributes" do
      get :show, params: { id: game1.game_room_code }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["games"].length).to eq 1
      expect(returned_json["games"][0]["game_room_code"]).to eq game1.game_room_code
      expect(returned_json["games"][0]["difficulty"]).to eq game1.difficulty
      expect(returned_json["games"][0]["deck"]["name"]).to eq deck1.name
    end
  end

  describe "POST#create" do
    it "creates a new game" do
      post_json = {
        game_room_code: "abcdef",
        difficulty: 15
      }

      prev_count = Game.count
      post(:create, params: { game: post_json, deck: { id: deck1.id } }, format: :json)
      expect(Game.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted game" do
      post_json = {
        game_room_code: "abcdef",
        difficulty: 15
      }

      post(:create, params: { game: post_json, deck: { id: deck1.id } }, format: :json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["game"]).to be_kind_of(Hash)
      expect(returned_json["game"]).to_not be_kind_of(Array)

      expect(returned_json["game"]["game_room_code"]).to eq game1.game_room_code
      expect(returned_json["game"]["difficulty"]).to eq game1.difficulty
      expect(returned_json["game"]["deck"]["name"]).to eq deck1.name
    end
  end
end