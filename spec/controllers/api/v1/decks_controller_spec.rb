require "rails_helper"

RSpec.describe Api::V1::DecksController, type: :controller do
  let!(:deck1) { Deck.create(
    name: "Initial K"
  )}

  let!(:deck2) { Deck.create(
    name: "Initial SH"
  )}

  let!(:card1) { Card.create(
    word: "cat"
  )}

  let!(:card2) { Card.create(
    word: "car"
  )}

  let!(:card3) { Card.create(
    word: "shed"
  )}

  let!(:card4) { Card.create(
    word: "shears"
  )}

  let!(:card_deck_1) { CardDeck.create(
    card: card1,
    deck: deck1
  )}

  let!(:card_deck_2) { CardDeck.create(
    card: card2,
    deck: deck1
  )}

  let!(:card_deck_3) { CardDeck.create(
    card: card3,
    deck: deck2
  )}

  let!(:card_deck_4) { CardDeck.create(
    card: card4,
    deck: deck2
  )}

  describe "GET#index" do
    it "should return a list of all the decks with associated cards" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["decks"].length).to eq 2

      expect(returned_json["decks"][0]["name"]).to eq "Initial K"
      expect(returned_json["decks"][0]["cards"][0]["word"]).to eq "cat"
      expect(returned_json["decks"][0]["cards"][1]["word"]).to eq "car"

      expect(returned_json["decks"][1]["name"]).to eq "Initial SH"
      expect(returned_json["decks"][1]["cards"][0]["word"]).to eq "shed"
      expect(returned_json["decks"][1]["cards"][1]["word"]).to eq "shears"
    end
  end
end