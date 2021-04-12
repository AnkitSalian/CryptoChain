const Block = require("./block");

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
    })
})