require 'test_helper'
class OrderTest < ActiveSupport::TestCase
  def setup
    @order = orders(:nynek)
  end

  test "order name validation" do
    if @order.restaurant_name
      assert @order.restaurant_name.length > 2, 'Restaurant name has to have at least 2 characters'
    else
      assert_not_nil @order.restaurant_name, 'meal is has to have name'
    end
  end

  test "order status" do
    assert_includes %w(ordered finalized delivered), @order.status ,'Order status has to be ordered, delivered or finalized'
  end
end
