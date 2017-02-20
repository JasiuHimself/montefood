class Api::MealsController < ApplicationController
  def index
    render json: Meal.all
  end
end
