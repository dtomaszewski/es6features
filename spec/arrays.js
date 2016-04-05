'use strict';
describe('Arrays', () => {
    const dishes = ['Burger', 'Pizza', 'Bacon'];
    const prices = [
        {
            name: 'Burger',
            price: 10
        },
        {
            name: 'Pizza',
            price: 8
        },
        {
            name: 'Bacon',
            price: 5
        }
    ];

    it('can return matching element with new find method', () => {
        // 'find' method returns first element which matches our requirements.
        // It works with simple arrays and with collections of objects.
        const bDish = dishes.find(dish => dish[0] === 'B');
        const lowPrice = prices.find(priceObj => priceObj.price < 8);
        const highestPrice = prices.find(priceObj => priceObj.price > 100);

        expect(bDish).toBe('Burger');
        expect(lowPrice).toEqual({name: 'Bacon', price: 5});
        // It returns undefined if it founds nothing.
        expect(highestPrice).not.toBeDefined();
    });

    it('can return index of matching element with findIndex method', () => {
        // It works exactly the same as 'find' method but in this case it returns
        // index of first matching element
        const bDishIndex = dishes.findIndex(dish => dish[0] === 'B');
        const nonExistingIndex = dishes.findIndex(dish => dish[0] === 'X');
        const lowPriceIndex = prices.findIndex(priceObj => priceObj.price < 8);

        expect(bDishIndex).toBe(0);
        // It returns -1 if it founds nothing.
        expect(nonExistingIndex).toBe(-1);
        expect(lowPriceIndex).toEqual(2);
    });

    it('can fill an array using fill method', () => {
        const pizzaToppings = ['Cheese', 'Olives', 'Bacon'];
        const pizzaPrices = [10, 15, 20, 25, 30, 35, 40];
        // It overwrites all values in existing array.
        pizzaToppings.fill('Bacon');
        // We can specify start index which means where We'll start with filling
        // and end index which specifies where filling is finished
        // (value on end index is not replaced).
        pizzaPrices.fill(11, 2, 4);

        expect(pizzaToppings).toEqual(['Bacon', 'Bacon', 'Bacon']);
        expect(pizzaPrices).toEqual([10, 15, 11, 11, 30, 35, 40]);
    });
});