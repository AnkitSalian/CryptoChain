const hexToBinary = require('hex-to-binary');
const Block = require("./block");
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require("./crypto-hash");

describe('Block', () => {
    const timestamp = 2000;
    const lastHash = 'foo-lastHash';
    const data = 'foo-data';
    const hash = 'foo-hash';
    const nonce = 1;
    const difficulty = 1;

    const block = new Block({ timestamp, lastHash, data, hash, nonce, difficulty });

    it('has timestamp, lastHash, hash and hash', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
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
            expect(minedBlock.hash).toEqual(
                cryptoHash(minedBlock.timestamp,
                    minedBlock.nonce,
                    minedBlock.difficulty,
                    lastBlock.hash,
                    data)
            );
        });

        it('sets an `hash` that meets difficulty criteria', () => {
            expect(hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
        });

        it('adjusts the difficulty', () => {
            const possibleResults = [lastBlock.difficulty + 1, lastBlock.difficulty - 1];
            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
        })
    });

    describe('adjustDifficulty()', () => {
        it('raises a difficulty for a quickly mined block', () => {
            expect(Block.adjustDifficulty({ originalBlock: block, timestamp: block.timestamp + MINE_RATE - 100 })).toEqual(block.difficulty + 1);
        });

        it('lowers a difficulty for a slowly mined block', () => {
            expect(Block.adjustDifficulty({ originalBlock: block, timestamp: block.timestamp + MINE_RATE + 100 })).toEqual(block.difficulty - 1);
        });

        it('has a lower limit of 1', () => {
            block.difficulty = -1;
            expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);
        });
    })

})