describe('Rest Parameters', () => {
    it('can replace unknown number of parameters passed to function', () => {
        // Rest parameter has to be last on parameter list and have '...' prefix.
        function doSomething(dish, ...sizes) {
            const sizeArray = [];

            sizes.forEach((size) => {
                sizeArray.push(size);
            });

            return sizeArray;
        }

        const dishSizes = doSomething('Burger', 'small', 'large', 'xxl');

        // If We do not provide any parameters for rest parameters it will be an empty array.
        // There won't be any error.
        const dishSizesEmpty = doSomething('Burger');

        expect(dishSizes).toEqual(jasmine.any(Array));
        expect(dishSizes[0]).toBe('small');
        expect(dishSizes[1]).toBe('large');
        expect(dishSizes[2]).toBe('xxl');

        expect(dishSizesEmpty).toEqual(jasmine.any(Array));
        expect(dishSizesEmpty.length).toBe(0);
    });
})