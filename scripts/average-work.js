const Blockchain = require('../blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initialData' });

let prevTimestamp, nextTimeStamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10000; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    blockchain.addBlock(`initial ${i}`);

    nextBlock = blockchain.chain[blockchain.chain.length - 1];

    nextTimeStamp = nextBlock.timestamp;
    timeDiff = nextTimeStamp - prevTimestamp;
    times.push(timeDiff);

    average = times.reduce((total, num) => (total + num)) / times.length;

    console.log(`Instance ${i} => Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms`);
}