'use strict';
describe('Iterators ', () => {
    it('provides iterator object with next method', () => {
        let totalPrice = 0;
        const orderPrices = [5, 12, 3, 10];
        // With values We receive iterator object with next() method.
        const iterator = orderPrices.values();
        // Next method provides us object from collection
        // {
        //  value: value of current collection item
        //  done: information if it is last item in collection
        // }
        let nextPrice = iterator.next();

        while (!nextPrice.done) {
            totalPrice += nextPrice.value;
            nextPrice = iterator.next();
        }

        expect(totalPrice).toBe(30);
    });
});