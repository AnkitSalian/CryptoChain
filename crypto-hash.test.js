const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {

    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('foo')).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    });

    it('produces same crypto hash with same input arguments in any order', () => {
        expect(cryptoHash('one', 'two', 'three', 1, 5, 8)).toEqual(cryptoHash(1, 'three', 'one', 8, 'two', 5));
    });
})