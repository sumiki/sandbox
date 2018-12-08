import math


class Week1:

    @staticmethod
    def split(num):
        num_str = str(num)
        split_digit = 0
        if (len(num_str) % 2) == 0:
            '''Even'''
            split_digit = len(num_str) / 2
        else:
            '''Odd'''
            split_digit = len(num_str) / 2 + 1

        return [
            int( num_str[0:split_digit] ),
            int( num_str[split_digit:len(str(num_str))] )
        ]

    @staticmethod
    def karatsuba(int1, int2):
        if int1 < 10 or int2 < 10:
            return int1 * int2

        n = len(str(int1))
        n2 = len(str(int2))
        if n < n2:
            n = n2

        n2 = math.floor(n / 2);

        [a, b] = Week1.split(int1);
        [c, d] = Week1.split(int2);

        ac = Week1.karatsuba(a, c);
        bd = Week1.karatsuba(b, d);
        abcd = Week1.karatsuba(a + b, c + d);
        magic = abcd - ac - bd;

        return long(ac * 10 ** (2 * n2) + magic * 10 ** n2 + bd);
