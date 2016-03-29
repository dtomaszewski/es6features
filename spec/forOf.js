'use strict';
describe('For of loop', () => {
    it('can iterate over values of collection', () => {
        const orderPrices = [5, 12, 3, 10];
        let totalPrice = 0;

        // Unlike 'for in' loop this iterates over values not over keys.
        // We don't need to use orderPrices[i], We can use values directly.
        // For of loop works for iterable collections such as
        // Array, Map, Set, String, TypedArray, arguments.
        for (const price of orderPrices) {
            totalPrice += price;
        }

        expect(totalPrice).toBe(30);
    });
});