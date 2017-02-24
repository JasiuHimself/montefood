class Api::MealsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Meal.where(order_id: params[:order_id])
  end

  def create
    respond_to :json
    @meal = Meal.new(params.require(:meal).permit(:name, :price, :order_id, :user_id))

    if Meal.exists?(@meal.order_id)
      return false
    end

    return false if @meal.name.length < 2
    return false if @meal.price < 0
    if Order.exists?(@meal.order_id)
      @meal.save
    end
    render json: @meal
  end


end
