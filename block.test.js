const Block = require("./block");
const { GENESIS_DATA } = require('./config');

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-lastHash';
    const data = 'foo-data';
    const hash = 'foo-hash';

    const block = new Block({ timestamp, lastHash, data, hash });

    it('has timestamp, lastHash, hash and hash', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns Genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    })

})