require "rails_helper"

RSpec.describe Api::V1::CardsController, type: :controller do
  let!(:deck1) { Deck.create(
    name: "Initial K",
    size: 25
  )}

  let!(:card1) { Card.create(
    name: "cat",
    deck: deck1
  )}

  let!(:card2) { Card.create(
    name: "car",
    deck: deck1
  )}

  describe "GET#index" do
    it "should return a list of all the cards" do

      get :index
      returned_json = JSON.parse(response.body)
      binding.pry

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["cards"][0]["name"]).to eq "cat"
      expect(returned_json["cards"][1]["name"]).to eq "car"

      expect(returned_json["cards"].length).to eq 2
    end
  end
end