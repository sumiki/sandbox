import unittest
from homework1 import Homework1

class Week1TestCase(unittest.TestCase):
    def test_split_1(self):
        array1 = [1,3,5,2,4,6]
        res = Homework1.sort_and_count( array1 )
        self.assertEqual(res[1], 3)

    def test_split_2(self):
        array1 = [1,5,3,2,4]
        self.assertEqual(Homework1.sort_and_count( array1 )[1], 4)

    def test_split_3(self):
        array1 = [5,4,3,2,1]
        self.assertEqual(Homework1.sort_and_count( array1 )[1], 10)

    def test_split_3(self):
        array1 = [1,6,3,2,4,5]
        self.assertEqual(Homework1.sort_and_count( array1 )[1], 5)

    def test_split_3(self):
        array1 = [1,2,3,4,5,6]
        self.assertEqual(Homework1.sort_and_count( array1 )[1], 0)


if __name__ == '__main__':
    unittest.main()
