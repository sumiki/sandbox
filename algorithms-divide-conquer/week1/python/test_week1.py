import unittest
from week1 import Week1

class Week1TestCase(unittest.TestCase):

    def test_split_2_2(self):
        split_array = Week1.split(1234)
        self.assertEqual(split_array, [12,34], 'fail to split')

    def test_split_2_3(self):
        split_array = Week1.split(12345)
        self.assertEqual(split_array, [123,45], 'fail to split')

    def test_karatsuba_1(self):
        result = Week1.karatsuba(1234, 5678)
        print(result)
        self.assertEqual(result, 7006652, 'fail to calc')

    def test_karatsuba_2(self):
        result = Week1.karatsuba(87654, 2335)
        print(result)
        self.assertEqual(result, 204672090, 'fail to calc')

    def test_karatsuba_3(self):
        result = Week1.karatsuba(32332333232331, 2020)
        print(result)
        self.assertEqual(result, 65311313129308620, 'fail to calc')

    def test_question(self):
        result = Week1.karatsuba(3141592653589793238462643383279502884197169399375105820974944592, 2718281828459045235360287471352662497757247093699959574966967627)
        print("{0:d}".format(result))

if __name__ == '__main__':
    unittest.main()