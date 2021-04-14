const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain {

    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock({ data }) {
        const newBlock = Block.mineData({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });

        this.chain.push(newBlock);
    }

    static isValidChain(chain) {

        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }

        for(let i = 1; i < chain.length; i++) {
            const {timestamp, data, hash, lastHash} = chain[i];
            const actualLastHashValue = chain[i - 1].hash;

            if(lastHash !== actualLastHashValue) {
                return false;
            }

            const validatedHash = cryptoHash(timestamp, data, lastHash);

            if(hash !== validatedHash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;