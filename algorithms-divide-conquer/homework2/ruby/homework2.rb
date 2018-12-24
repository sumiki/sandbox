



class Homework2
  
  attr_accessor :array, :count
  
  def initialize( array, pivit_index )
    @array = array
    @pivit_index = pivit_index
    @count = 0
  end
  
  def run
    quicksort(0, @array.length - 1 )
  end
  
  def quicksort( origin_index, final_index )
    @count += 1
    #p @array
    #p "---first: #{@array[origin_index..final_index]}"
    #p "origin_index: #{origin_index}"
    #p "final_index: #{final_index}"
    pivit_index = @pivit_index + origin_index
    pivit = @array[pivit_index]
    i = origin_index + 1

    for j in origin_index..final_index do
      item = @array[j]
      if j == pivit_index
        next
      end
      
      if item < pivit
        #p "@array[i]: #{@array[i]} <=> @array[j]: #{@array[j]}"
        tmp = @array[i]
        @array[i] = @array[j]
        @array[j] = tmp
        i += 1
      end
      
      if i != pivit_index and j == final_index
        #p "@array[pivit_index]:#{@array[pivit_index]} <=> @array[i - 1]:#{@array[i - 1]}"
        tmp = @array[i - 1]
        @array[i - 1] = @array[pivit_index]
        @array[pivit_index] = tmp
      end
    end
    
    if i > origin_index
      #p "(i - 2):#{(i - 2)}"
      #p "origin_index: #{origin_index}"
      if (i - 2) - origin_index >= 1
        #p "first : #{ origin_index } #{ i - 2  }"
        quicksort( origin_index, i - 2  )
      end
      
    end

    next_origin = i

    #p "final_index:#{final_index}"
    #p "next_origin: #{next_origin}"
    
    if final_index - next_origin >= 1
      #p "second : #{ next_origin } #{ final_index  }"
      quicksort( next_origin, final_index )
    end
    
  end
  
end


