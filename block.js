class Block {
    constructor({ timestamp, lasthash, hash, data }) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
    }
}

const block1 = new Block({ timestamp: '12/04/2021', lasthash: 'foo-lastHash', hash: 'foo-hash', data: 'foo-data' });

console.log('block1', block1);