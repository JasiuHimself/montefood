class Api::OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def create
    respond_to :json
    order = Order.new(params.require(:order).permit(:restaurant_name, :status))
    validateOrder(order)
  end

  def update
    respond_to :json
    order = Order.find(params[:id])
    order.status = params[:order][:status]
    validateOrder(order)
  end

  private

  def validateOrder(order)
    if order.valid?
      if order.save
        render json: order
      else
        flash[:error] = 'Saving order failed!'
      end
    else
      flash[:error] = 'The order record is invalid!'
    end
  end
end
