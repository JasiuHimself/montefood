require "rails_helper"

RSpec.describe Api::OrdersController, :type => :controller do
  describe "GET index" do
    it "has a 200 status code" do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
  end

  describe "create order" do
    it "creates new order and responds with json" do
      json =  {:format => 'json', :order => {:restaurant_name => 'some_restaurant', :status => 'ordered' }}
      post :create, params: json
      expect(response).to be_success
      parsed_responce = JSON.parse(response.body)
      expect(parsed_responce["restaurant_name"]).to eq(json[:order][:restaurant_name])
      expect(parsed_responce["status"]).to eq(json[:order][:status])
      expect(response.status).to eq(200)
    end
  end

  describe "update order" do
    it "updates existing order and responds with json" do
      json =  {:id => 1, :format => 'json', :order => {:status => 'finalized' }}
      put :update , params: json
      expect(response).to be_success
      parsed_responce = JSON.parse(response.body)
      expect(parsed_responce["status"]).to eq(json[:order][:status])
      expect(response.status).to eq(200)
    end
  end
end
