require 'minitest/autorun'
require './homework2'

class WeightTest < Minitest::Test
  
  def setup

  end
  
  def first_elm_pivit
    array = [3,8,2,5,1,4,7,6,12,10,9,11]
    @homework2 = Homework2.new( array )
    @homework2.run
    p @homework2.array
    p @homework2.count
    #assert_equal
  end
  
  def test_homework
    array = []
    File.open('QuickSort.txt') do |file|
      file.each_line do |number|
        array.push(number.to_i)
      end
    end
    @homework2 = Homework2.new( array )
    @homework2.run
    p @homework2.array
    p @homework2.count

    prev = 0
    flag = true
    @homework2.array.each do |item|
      if item > item
        flag = false
      end
      prev = item
    end
    assert flag, true
  end
  
  
end
