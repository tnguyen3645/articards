require "rails_helper"

RSpec.describe Api::V1::DecksController, type: :controller do
  let!(:deck1) { Deck.create(
    name: "Initial K",
    size: 25
  )}

  let!(:deck2) { Deck.create(
    name: "Initial SH",
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

  let!(:card3) { Card.create(
    name: "shed",
    deck: deck2
  )}

  let!(:card4) { Card.create(
    name: "shears",
    deck: deck2
  )}

  describe "GET#index" do
    it "should return a list of all the decks" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["decks"].length).to eq 2

      expect(returned_json["decks"][0]["name"]).to eq "Initial K"
      expect(returned_json["decks"][0]["cards"][0]["name"]).to eq "cat"
      expect(returned_json["decks"][0]["cards"][1]["name"]).to eq "car"

      expect(returned_json["decks"][1]["name"]).to eq "Initial SH"
      expect(returned_json["decks"][1]["cards"][0]["name"]).to eq "shed"
      expect(returned_json["decks"][1]["cards"][1]["name"]).to eq "shears"
    end
  end
end