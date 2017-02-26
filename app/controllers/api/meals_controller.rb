class Api::MealsController < ApplicationController
  def index
    render json: Meal.where(order_id: params[:order_id])
  end

  def create
    respond_to :json
    meal = Meal.new(params.require(:meal).permit(:name, :price, :order_id, :user_id))
    if meal.valid?
      if meal.save
        render json: meal
      else
        flash[:notice] = "Saving meal failed!"
      end
    else
      flash[:notice] = "The meal record is invalid!"
    end
  end
end
