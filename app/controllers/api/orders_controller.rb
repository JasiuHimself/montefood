class Api::OrdersController < ApplicationController
  skip_before_action :verify_authenticity_token


  def index
    render json: Order.all
  end


  def create
    respond_to :json
    @order = Order.new(params.require(:order).permit(:restaurant_name))
    return false if @order.restaurant_name.length < 2
    @order.save

  end


end
