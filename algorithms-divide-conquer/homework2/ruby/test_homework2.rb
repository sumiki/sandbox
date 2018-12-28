require 'minitest/autorun'
require './homework2'

class WeightTest < Minitest::Test
  
  def setup
    array = [3,8,2,5,1,4,7,6]
    @homework2 = Homework2.new( array, nil )
  end
  
  def test_first_elm_pivit
    @homework2.run
    p @homework2.array
    p @homework2.count
    #assert_equal
  end
  
end
