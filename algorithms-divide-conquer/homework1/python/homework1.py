
class Homework1:

    @staticmethod
    def merge_and_count(array1, array2):
        inversion_count = 0
        res_array = []
        i = 0
        j = 0
        prev = None
        while ( i <= ( len(array1) - 1) or j <= (len(array2) - 1 ) ):

            if i > (len(array1) - 1):
                res_array.append( array2[j] )
                j += 1
            elif j > (len(array2) - 1):
                res_array.append( array1[i] )
                i += 1
            else:
                if array1[i] < array2[j]:
                    res_array.append(array1[i])
                    i += 1
                else:
                    res_array.append(array2[j])
                    j += 1
                    inversion_count += ( len(array1) - i )

        return res_array, inversion_count

    @staticmethod
    def sort_and_count(array):
        array_length = len(array)
        if array_length <= 1:
            return [array, 0]

        b, inversion_count_b = Homework1.sort_and_count(array[:array_length/2])
        c, inversion_count_c = Homework1.sort_and_count(array[array_length/2:])
        d, inversion_count_d = Homework1.merge_and_count( b, c )

        return d, ( inversion_count_b + inversion_count_c + inversion_count_d )
