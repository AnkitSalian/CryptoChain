const Block = require("./block");
const { GENESIS_DATA } = require('./config');
const cryptoHash = require("./crypto-hash");

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
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineData({ lastBlock, data });

        it('returns Block instance', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets the `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on proper inputs', () => {
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
        })
    })

})