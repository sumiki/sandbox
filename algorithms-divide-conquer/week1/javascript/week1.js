export default {
    split: function(num){
        const num_str = num.toString()
        var split_digit = 0
        if( ( num_str.length % 2 ) === 0 ){
            // Even
            split_digit = num_str.length / 2
        } else {
            // Odd
            split_digit = ( num_str.length / 2 ) + 1
        }
        return [
            parseInt( num_str.substring(0, split_digit) ),
            parseInt( num_str.substring(split_digit, split_digit.length) )
        ]
    },
    karatsuba: function(int1, int2){
        if( int1 < 10 || int2 < 10 ){
            return int1 * int2
        }

        const n = Math.max(int1.toString().length, int2.toString().length);
        const n2 = Math.floor(n / 2);

        const [a, b] = this.split(int1);
        const [c, d] = this.split(int2);

        const ac = this.karatsuba(a, c);
        const bd = this.karatsuba(b, d);
        const abcd = this.karatsuba(a + b, c + d);
        const magic = abcd - ac - bd;

        return ac * 10 ** (2 * n2) + magic * 10 ** n2 + bd;
    }
}