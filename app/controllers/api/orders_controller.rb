class Api::OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def create
    respond_to :json
    order = Order.new(params.require(:order).permit(:restaurant_name, :status))
    return false if order.restaurant_name.length < 2
    order.save
    render json: order
  end

  def update
    respond_to :json
    order = Order.find(params[:id])
    order.status = params[:order][:status]
    order.save
    render json: order
  end
end
