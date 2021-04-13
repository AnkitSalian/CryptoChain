const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain = new Blockchain();

    beforeEach(() => {
        blockchain = new Blockchain();
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
            })
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

            describe('and the chain does not conatin any invalid Blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            })
        })
    })

})