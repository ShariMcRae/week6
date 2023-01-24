var expect = chai.expect;
describe('MyFunctions', function() {
    describe('#Card constructor', function() {
        it('should instantiate a new Card', function() {
            var card = new Card(Card.values[0], Card.suits[0]);
            expect(card.value).to.equal(Card.values[0]);
            expect(card.suit).to.equal(Card.suits[0]);
        });
        it('should throw an error if value/first argument is not in Card.values array', function() {
            expect(function() {
                var card = new Card("Joker", Card.suits[0]);
            }).to.throw(Error);
        });
        it('should throw an error if suit/second argument is not in Card.suits array', function() {
            expect(function() {
                var card = new Card(Card.values[0], "Flowers");
            }).to.throw(Error);
        });        
    });
});