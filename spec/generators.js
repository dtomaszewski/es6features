'use strict';
describe('Generators', () => {
    it('generates an iterator', () => {
        // To mark that function is a generator We use star (*).
        // Each time client of generator function calls next() code in generator is
        // executed until it encounters 'yield' keyword. After when another next()
        // is called code in generator function is executed from place where it stopped
        // previously to the next 'yield'.
        const dishes = function*() {
            // Each yield value is next value for next() iterator method.
            yield 'Pizza';
            yield 'Steak';
            yield 'and Burger';
        };

        let text = 'Our cook can make';

        // generator creates iterable object so We can use for of loop.
        for (const dish of dishes()) {
            text = `${text} ${dish}`;
        }

        expect(text).toBe('Our cook can make Pizza Steak and Burger');
    });

    it('allows us to easily build iterable object', () => {
        // This class has the same functionality as in iterable.js but with much less code.
        class Cook {
            constructor() {
                this.dishes = [];
            }

            addDish(...dishes) {
                this.dishes = this.dishes.concat(dishes);
            }
            // To make generator We use star '*'.
            *[Symbol.iterator]() {
                for (const dish of this.dishes) {
                    yield dish;
                }
            }
        }

        let text = 'Our cook can make';

        const cook = new Cook();
        cook.addDish('Pizza', 'Steak', 'Burger');

        for (const dish of cook) {
            text = `${text} ${dish}`;
        }

        expect(text).toBe('Our cook can make Pizza Steak Burger');
    });

    it('sets done flag to true on return statement', () => {
        const dishes = [
            {name: 'Steak'},
            {name: 'Fish', vegetarian: true},
            {name: 'Burger'},
            {name: 'Salad', vegetarian: true},
            {name: 'Lasagne'},
            {name: 'Pork'},
            {name: 'Carrots', vegetarian: true}
        ];

        let iterationCounter = 0;
        // We can break generator function with 'return' statement.
        const takeVegetarian = function*(dishesList, limit) {
            let counter = 0;
            for (const dish of dishesList) {
                iterationCounter += 1;
                if (dish.vegetarian) {
                    yield dish;
                    counter += 1;
                    if (counter >= limit) {
                        return;
                    }
                }
            }
        };

        const returnedDishes = [];

        for (const dish of takeVegetarian(dishes, 2)) {
            returnedDishes.push(dish.name);
        }

        expect(returnedDishes).toEqual(['Fish', 'Salad']);
        // using generators We don't need to iterate through whole collection,
        // in this case for example generator function breaks when We have
        // expected number of vegetarian dishes yielded.
        // There were only 4 iterations on collection bigger than 4.
        expect(iterationCounter).toBe(4);
    });

    it('can use parameter passed to next() function', () => {
        const dishes = function*() {
            // We're receiving parameter passed to next() as parameter returned from yield.
            // So there is a limitation that We can't receive parameter which is passed
            // to first call of next().
            let text = yield 'Pizza';
            text = yield `${text} Steak`;
            yield `${text} Burger`;
        };

        let text = 'Our cook can make';

        const iterator = dishes();

        text = `${text} ${iterator.next('I can\'t receive this value in generator :( ').value}`;
        text = `${text} ${iterator.next('and').value}`;
        text = `${text} ${iterator.next('and also').value}`;

        expect(text).toBe('Our cook can make Pizza and Steak and also Burger');
    });
});