  class MealTest < ActiveSupport::TestCase
  def setup
    @meal = meals(:frytkebab)
    # @meal.name = nil
  end

  test "meal name validation" do
    if @meal.name
      assert @meal.name.length >= 2, 'meal name has to have at leat 2 characters'
    else
      assert_not_nil @meal.name, 'meal is has to have name'
    end
  end

  test "meal price" do
    if @meal.price
      assert @meal.price > 0 , 'meal has to have positive price'
    else
      assert @meal.price, 'meal has to have price'
    end
  end

  test "meal belong to order" do
    assert_not_empty Order.where(id: @meal.order_id), 'Meal should belong to order!'
  end

end
