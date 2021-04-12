class Block {
    constructor({ timestamp, lastHash, hash, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    // genesis() {
    //     const genesisBlock = new Block(GENESIS_DATA.timestamp, GENESIS_DATA.lasthash, GENESIS_DATA.hash, GENESIS_DATA.data);
    //     return genesisBlock;
    // }
}

module.exports = Block;