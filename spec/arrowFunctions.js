'use strict';
describe('Arrow functions', () => {
    it('provides compact syntax to define functions', () => {
        // We can use lambda operator (arrow function) to define function.
        const countTotalPrice = (burgers, price) => burgers * price;

        // With single parameters We don't need parenthesis.
        const makeBurger = x => `${x} is ready`;

        // Without parameters parenthesis are required.
        const addBacon = () => 'Additional bacon added';

        // We can write multiple lines using curly braces.
        const makePizza = (...ingredients) => {
            let pizza = 'Pizza with';
            for (let i = 0; i < ingredients.length; i++) {
                pizza = `${pizza} ${ingredients[i]}`;
            }

            return pizza;
        };

        expect(countTotalPrice(3, 20)).toBe(60);
        expect(makeBurger('Bacon Burger')).toBe('Bacon Burger is ready');
        expect(addBacon()).toBe('Additional bacon added');
        expect(makePizza('salami', 'olives', 'pepperoni'))
            .toBe('Pizza with salami olives pepperoni');
    });

    it('fits very well in methods where We\'re passing functions ', () => {
        const burgerPrices = [5, 10, 15, 20];

        const burgerTakeawayPrices = burgerPrices.map(price => price + 1);

        expect(burgerTakeawayPrices).toEqual([6, 11, 16, 21]);
    });

    // function keyword in this test is used on purpose to
    // create closure with 'this' object for this particular test.
    it('binds to \'this\' from outside scope', function(done) {
        this.burgerStatus = 'Ready';

        // If We'll use normal function here We will get error
        // because function will create closure where 'this'
        // object will be different than 'this' outside of it.
        // Using arrow functions We don't need to worry about 'this' reference changing.
        setTimeout(() => {
            // If We use arrow function 'this' object is captured from context where it is defined.
            expect(this.burgerStatus).toBe('Ready');

            // With done We're telling Jasmine that async work is finished.
            done();
        }, 1);
    });
});