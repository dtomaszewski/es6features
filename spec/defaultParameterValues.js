describe('Default parameter values', () => {
    it('Can have default parameter defined in function', () => {
        // This assignments works only on undefined
        // It will not work for null, empty string, 0 etc.
        // (it is difference between this solution and dish || 'Burger' solution)
        function doSomething(dish = 'Burger') {
            return dish;
        }

        expect(doSomething()).toBe('Burger');
        expect(doSomething('')).toBe('');
        expect(doSomething('Pizza')).toBe('Pizza');

        expect(doSomething(null)).toBe(null);
        expect(doSomething(0)).toBe(0);
        expect(doSomething(undefined)).toBe('Burger');
    });

    it('can provide values for undefined destructured parameters', () => {
        function doSomething(dish = 'Burger', addition = 'Fries', meat = 'Beef') {
            return [
                dish,
                addition,
                meat
            ];
        }

        const [myDish, myAddition, myMeat] = doSomething('Pizza', undefined, null);

        expect(myDish).toBe('Pizza');
        expect(myAddition).toBe('Fries');
        expect(myMeat).toBe(null);
    });

    it('can provide values for undefined object fields', () => {
        // If We will not provide some object fields it will be overwritten with default values.
        function doSomething(dish = 'Pizza', {meat = 'Salami', addition = 'Sauce'}) {
            expect(dish).toBe('Burger');
            expect(meat).toBe('Salami');
            expect(addition).toBe('Bacon');
        }

        doSomething('Burger', {
            addition: 'Bacon'
        });
    });
});