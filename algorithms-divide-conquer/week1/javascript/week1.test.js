import week1 from './week1'

describe( 'split', function(){
    it('should return 2 * 2 digits split result', function(){
        const split_result = week1.split(1234)
        expect(split_result).toEqual([12,34])
    })
    it('should return 2 * 3 digit split result', function(){
        const split_result = week1.split(12345)
        expect(split_result).toEqual([123,45])
    })

} )

describe( 'karatsuba', function(){
    it('should return a correct multiplication result for 1234 * 5678', function(){
        const product = week1.karatsuba(1234, 5678);
        expect(product).toBe(7006652);
    })
} )

