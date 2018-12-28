
class Homework2
  
  attr_accessor :array, :count
  
  def initialize( array, pivit_index = nil )
    @array = array
    @pivit_index = pivit_index
    @count = 0
  end
  
  def run
    quicksort(0, @array.length - 1 )
  end
  
  def quicksort( origin_index, final_index )
    @count += 1
    
    #if @count > 5
    #  return
    #end
    
    p @array
    p "---first: #{@array[origin_index..final_index]}"
    #p "origin_index: #{origin_index}"
    #p "final_index: #{final_index}"
    pivit_index_config = @pivit_index
    unless pivit_index_config
      pivit_index_config = Random.rand(final_index - origin_index)
    end
    #p "pivit_index_config: #{pivit_index_config}"
    
    
    pivit_index = @array.index(@array[origin_index..final_index][pivit_index_config])
    pivit = @array[origin_index..final_index][pivit_index_config]
    p "pivit [#{pivit_index}] : #{ pivit }"
    i = origin_index

    for j in origin_index..final_index do
      item = @array[j]
      if j == pivit_index
        next
      end
      
      #p "compare: #{ item }[#{j}] < #{ pivit }[#{pivit_index}]"
      if item < pivit
        if pivit_index == i
          i += 1
        end
        #p "@array[i]:[#{i}] #{@array[i]} <=> @array[j]:[#{j}] #{@array[j]}"
        tmp = @array[i]
        @array[i] = @array[j]
        @array[j] = tmp
        i += 1
      end
      #p @array[origin_index..final_index]
      
    end
    
    replace_index = i
    next_origin = i
    if pivit_index < i
      replace_index -= 1
    elsif pivit_index > i
      next_origin += 1
    end

    #p "----before replace------"
    #p "i: #{i}"
    #p "replace_index: #{replace_index}"
    #p "pivit_index: #{pivit_index}"
    #p "next_origin: #{next_origin}"
    

    if (replace_index) != pivit_index
      #p "---pivit swap---@array[pivit_index]:[#{pivit_index}] #{@array[pivit_index]} <=> @array[i - 1]:[#{ replace_index }]#{@array[replace_index]}"
      tmp = @array[replace_index]
      @array[replace_index] = @array[pivit_index]
      @array[pivit_index] = tmp
    end

    p "---last: #{@array[origin_index..final_index]}"
    #p @array
    #p "pivit: [#{pivit_index}] = #{ pivit }"
    #p "=To next =#{ final_index - origin_index > 1 }==========="
    #p "origin_index: #{origin_index}"
    #p "i: #{i}"
    #p "first: (i - 2) - origin_index = #{(replace_index - 1) - origin_index >= 1}, ( #{origin_index}, #{replace_index - 1} )"
    #p "final_index:#{final_index}"
    #p "next_origin: #{next_origin}"
    #p "second: final_index - next_origin = #{final_index - next_origin >= 1} ( #{next_origin}, #{final_index} )"
    #p ''

    # 要素が２個の場合は次はない
    if final_index - origin_index > 1
      if (replace_index - 1) - origin_index >= 1
        #p "first : #{ origin_index } #{ replace_index - 1  }"
        quicksort( origin_index, replace_index - 1  )
      end
  
      if final_index - next_origin > 1
        #p "second : #{ next_origin } #{ final_index  }"
        quicksort( next_origin, final_index )
      end
    end

    
  end
  
end


