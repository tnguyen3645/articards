require "rails_helper"

RSpec.describe Api::V1::CardsController, type: :controller do
  let!(:card1) { Card.create(
    word: "cat"
  )}

  let!(:card2) { Card.create(
    word: "car"
  )}

  let!(:deck1) { Deck.create(
    name: "Initial K"
  )}

  let!(:deck2) { Deck.create(
    name: "Initial SH"
  )}

  describe "GET#index" do
    it "should return a list of all the cards" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["cards"][0]["word"]).to eq "cat"
      expect(returned_json["cards"][1]["word"]).to eq "car"

      expect(returned_json["cards"].length).to eq 2
    end
  end

  describe "POST#create" do
    it "creates a new card" do
      post_json = {
        card: {
          word: "best"
        }
      }

      prev_count = Card.count
      post(:create, params: post_json, format: :json)
      expect(Card.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted card" do
      post_json = {
        card: {
          word: "best"
        }
      }

      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["card"]).to be_kind_of(Hash)
      expect(returned_json["card"]).to_not be_kind_of(Array)
      expect(returned_json["card"]["word"]).to eq "best"
    end

    it "returns the json of the newly posted card associated to a deck" do
      post_json = {
        word: "best"
      }

      post(:create, params: { card: post_json, :decks => [{ value: deck1["name"] }, { value: deck2["name"] }] }, format: :json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["card"]).to be_kind_of(Hash)
      expect(returned_json["card"]).to_not be_kind_of(Array)
      expect(returned_json["card"]["word"]).to eq "best"
    end

    it "returns an error if the card already exists" do
      post_json = {
        card: {
          word: "cat"
        }
      }

      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 400
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq("Word has already been taken")
      expect(returned_json["status"]).to eq 400
    end

  end
end