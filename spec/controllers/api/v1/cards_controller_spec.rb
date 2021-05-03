require "rails_helper"

RSpec.describe Api::V1::CardsController, type: :controller do
  let!(:card1) { Card.create(
    name: "Parachute"
  )}

  let!(:card2) { Card.create(
    name: "Moose"
  )}

  describe "GET#index" do
    it "should return a list of all the cards" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["cards"][0]["name"]).to eq "Parachute"
      expect(returned_json["cards"][1]["name"]).to eq "Moose"

      expect(returned_json["cards"].length).to eq 2
    end
  end
end