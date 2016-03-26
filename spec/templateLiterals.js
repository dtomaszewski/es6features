'use strict';
describe('Template literals', () => {
    it('Can be inserted into static string', () => {
        // In template literals We have to use '`' (backtick) sign instead of single/double quote.
        function doSomething(dish) {
            return `${dish} ordered !`;
        }

        // It can be useful in building urls to some API.
        const dish = 'baconburger';
        const count = '1';
        const burgerUrl = `http://getmeaburger/${dish}/${count}`;

        expect(doSomething('Burger')).toBe('Burger ordered !');
        expect(burgerUrl).toBe('http://getmeaburger/baconburger/1');
    });

    it('can use function to modify string', () => {
        // We can modify concatenated string with method.
        // When We use method in first parameter We receive array of all strings in template
        // In second parameter We receive array of all values
        // We can modify it however We want and return it as a new string.
        function createOrder(strings, ...values) {
            expect(strings.length).toBe(2);
            expect(strings).toEqual(['Burgers ordered : ', ' pieces']);
            expect(values.length).toBe(1);
            expect(values).toEqual([3]);

            return `Prepare ${values[0]}${strings[1]}`;
        }

        const customer1 = 1;
        const customer2 = 2;
        // We can make some operations on arguments. It will be passed to createOrder function as
        // sum of values.
        const order = createOrder `Burgers ordered : ${customer1 + customer2} pieces`;

        expect(order).toBe('Prepare 3 pieces');
    });

    it('can be multiline', () => {
        const text = `Burgers are good
with bacon`;

        expect(text).toBe('Burgers are good\nwith bacon');
    });
});