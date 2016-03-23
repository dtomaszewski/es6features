'use strict';
describe('Destructuring', () => {
    it('can swap values without temp value', () => {
        let x = 1;
        let y = 2;

        const [z, w] = [x, y];

        // First square brackets don't mean that it is an array.
        // It means that We're working with two individual variables one after another.
        [x, y] = [y, x];

        expect(z).toBe(1);
        expect(w).toBe(2);

        expect(x).toBe(2);
        expect(y).toBe(1);
    });

    it('can come from function', () => {
        function doSomething() {
            return [1, 2, 3];
        }
        // If We want to assign specific elements to array's values
        // We can use empty spaces made with comma.
        const [, x, y] = doSomething();

        expect(x).toBe(2);
        expect(y).toBe(3);
    });

    it('can work with objects', () => {
        function doSomething() {
            return {
                type: 'Burger',
                meat: 'Beef',
                additions: {
                    inside: 'Bacon',
                    outside: 'Fries'
                }
            };
        }
        // The same as in previous example here We have individual variables not object literal.
        const {
            type: myType,
            meat: myMeat,
            additions: {
                inside: myBacon,
                outside: myFries
                }
            } = doSomething();

        expect(myType).toBe('Burger');
        expect(myMeat).toBe('Beef');
        expect(myBacon).toBe('Bacon');
        expect(myFries).toBe('Fries');

        // We can use shorter version when We want to have
        // variable names the same as object field names.
        const {
            type,
            meat,
            additions: {
                inside,
                outside
                }
            } = doSomething();

        expect(type).toBe('Burger');
        expect(meat).toBe('Beef');
        expect(inside).toBe('Bacon');
        expect(outside).toBe('Fries');
    });

    it('can be used in function parameters', () => {
        // We don't need to use parameter.meat in our function,
        // We can name it straight away.
        function doSomething(dish, {meat, addition}) {
            expect(dish).toBe('Burger');
            expect(meat).toBe('Beef');
            expect(addition).toBe('Bacon');
        }

        doSomething('Burger', {
            meat: 'Beef',
            addition: 'Bacon'
        });
    });
});