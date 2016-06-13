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
        const pizzaToppings = ['Cheese', 'Olives', 'Bacon', 'Mushrooms', 'Onions'];
        const pizzaPrices = [10, 15, 20, 25, 30, 35, 40, 45, 50];
        // It overwrites all values in existing array.
        pizzaToppings.fill('Bacon');
        // We can specify start index which means where We'll start with filling
        // and end index which specifies where filling is finished
        // (value on end index is not replaced).
        pizzaPrices.fill(11, 2, 4);

        expect(pizzaToppings).toEqual(['Bacon', 'Bacon', 'Bacon', 'Bacon', 'Bacon']);
        expect(pizzaPrices).toEqual([10, 15, 11, 11, 30, 35, 40, 45, 50]);
    });

    it('can copy part of array and paste it inside itself using copyWithin method', () => {
        // I'm not using beforeEach here to increase readability.
        const pizzaToppings = ['Cheese', 'Olives', 'Bacon', 'Mushrooms', 'Onions'];
        const pizzaPrices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const burgerPrices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // First parameter is index with target where part of array will be copied.
        // Second parameter is index which target where to start copying.
        // Third parameter number of items to copy - this parameter is optional.
        // In this case We'll copy two parameters from index 0 and paste will begin from index 2.
        pizzaToppings.copyWithin(2, 0, 2);

        // If third parameter is not specified elements will be copied till end of array.
        pizzaPrices.copyWithin(3, 1);

        // We can also give negative parameters to operate on indexes from the end of array
        // In this case We start copying into 4th index from the end and copied array starts
        // from 6th index from the end.
        burgerPrices.copyWithin(-4, -6);

        expect(pizzaToppings).toEqual(['Cheese', 'Olives', 'Cheese', 'Olives', 'Onions']);
        expect(pizzaPrices).toEqual([1, 2, 3, 2, 3, 4, 5, 6, 7]);
        expect(burgerPrices).toEqual([1, 2, 3, 4, 5, 4, 5, 6, 7]);
    });

    it('can create an array using \'of\' method', () => {
        // It is not possible with new Array(10) which will return array with 10 empty items.
        const pizzaPrice = Array.of(10);

        expect(pizzaPrice).toEqual([10]);
        expect(pizzaPrice.length).toBe(1);
    });

    it('has \'entries\' method which returns an iterator with key-value pair', () => {
        const pizzaToppings = ['Cheese', 'Olives', 'Bacon'];
        const entries = pizzaToppings.entries();

        // Each entry value is an array with index and value
        expect(entries.next().value).toEqual([0, 'Cheese']);
        expect(entries.next().value).toEqual([1, 'Olives']);
        expect(entries.next().value).toEqual([2, 'Bacon']);
        // If We call next over the last element of array We'll receive undefined.
        expect(entries.next().value).not.toBeDefined();
    });

    it('has \'keys\' method which returns iterator with keys', () => {
        const pizzaToppings = ['Cheese', 'Olives', 'Bacon'];
        const keys = pizzaToppings.keys();

        // It returns only key value
        expect(keys.next().value).toBe(0);
        expect(keys.next().value).toBe(1);
        expect(keys.next().value).toBe(2);
        // If We call next over the last element of array We'll receive undefined.
        // Similarly as in 'entries' method
        expect(keys.next().value).not.toBeDefined();
    });
});