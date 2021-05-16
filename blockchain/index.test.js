const Blockchain = require('.');
const Block = require('./block');
const { cryptoHash } = require('../util');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockchain.chain;
    })

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with Genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new Block to the chain', () => {
        const newData = 'foo data';
        blockchain.addBlock({ data: newData });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when the chain doesnt start with Genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when chain starts with Genesis block and has multible blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Lion' });
                blockchain.addBlock({ data: 'Tiger' });
                blockchain.addBlock({ data: 'Cheetah' });
            });
            describe('and lastHash reference has been changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'garbage-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain constains a Block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'garbage-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain consist of a block with junk difficulty', () => {
                it('returns false', () => {
                    const lastBlock = blockchain.chain[blockchain.chain.length - 1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const data = [];
                    const nonce = 0;
                    const difficulty = lastBlock.difficulty - 3;

                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block({ timestamp, lastHash, hash, data, nonce, difficulty });

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            })

            describe('and the chain does not conatin any invalid Blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });

    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        })

        describe('when the newChain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' };
                blockchain.replaceChain(newChain.chain);
            })

            it('does not replace chain', () => {
                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'Lion' });
                newChain.addBlock({ data: 'Tiger' });
                newChain.addBlock({ data: 'Cheetah' });
            });

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'garbage-hash';

                    blockchain.replaceChain(newChain.chain);
                });

                it('does not replace chain', () => {
                    expect(blockchain.chain).toEqual(originalChain);
                });

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });

            });

            describe('and  the chain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                })
                it('replaces chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                });

                it('logs an log', () => {
                    expect(logMock).toHaveBeenCalled();
                });
            })
        })
    })

})