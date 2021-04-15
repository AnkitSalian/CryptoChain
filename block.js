const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');
class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineData({ lastBlock, data }) {
        let date = Date.now();
        let lastHash = lastBlock.hash;
        return new this({
            timestamp: date,
            lastHash,
            data,
            hash: cryptoHash(date, lastHash, data)
        })
    }
}

module.exports = Block;