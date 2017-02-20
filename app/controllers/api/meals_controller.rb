class Api::MealsController < ApplicationController
  def index
    render json: Meal.where(order_id: params[:order_id])
  end

end
