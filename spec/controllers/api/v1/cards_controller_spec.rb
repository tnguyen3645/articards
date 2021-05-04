require "rails_helper"

RSpec.describe Api::V1::CardsController, type: :controller do
  let!(:card1) { Card.create(
    word: "cat"
  )}

  let!(:card2) { Card.create(
    word: "car"
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
end