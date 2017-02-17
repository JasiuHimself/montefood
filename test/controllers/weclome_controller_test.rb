require 'test_helper'

class WeclomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get weclome_index_url
    assert_response :success
  end

end
