
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
    
    #if @count > 5
    #  return
    #end
    
    #p @array
    #p "---first: #{@array[origin_index..final_index]}"
    #p "origin_index: #{origin_index}"
    #p "final_index: #{final_index}"
    
    pivit_index = @array.index(@array[origin_index..final_index][@pivit_index])
    pivit = @array[origin_index..final_index][@pivit_index]
    #p "pivit [#{pivit_index}] : #{ pivit }"
    i = origin_index

    for j in origin_index..final_index do
      item = @array[j]
      if j == pivit_index
        i += 1
        next
      end
      
      if item < pivit
        #p "@array[i]:[#{i}] #{@array[i]} <=> @array[j]:[#{j}] #{@array[j]}"
        tmp = @array[i]
        @array[i] = @array[j]
        @array[j] = tmp
        i += 1
      end
      
    end
    
    if (i - 1) != pivit_index
      #p "---pivit swap---@array[pivit_index]:[#{pivit_index}] #{@array[pivit_index]} <=> @array[i - 1]:[#{ i - 1 }]#{@array[i - 1]}"
      tmp = @array[i - 1]
      @array[i - 1] = @array[pivit_index]
      @array[pivit_index] = tmp
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
    #p final_index - next_origin
    
    if final_index - next_origin >= 1
      #p "second : #{ next_origin } #{ final_index  }"
      quicksort( next_origin, final_index )
    end
    
  end
  
end


