describe('Spread operator', () => {
    it('can have separate parameters out of passed array', () => {
        // We don't need to call parameter[0], parameter[1] ... any more.
        function doSomething(dish, meat, addition) {
            expect(dish).toBe('Burger');
            expect(meat).toBe('Beef');
            expect(addition).toBe('Fries');
        }

        doSomething(...['Burger', 'Beef', 'Fries']);
    });

    it('can create an array out of smaller ones', () => {
        const dishes = ['Burger', 'Pizza'];
        const meats = ['Beef', 'Salami'];
        const additions = ['Fries', 'Sauce'];

        // It can be new array
        const all = [...dishes, ...meats, ...additions];

        // Or part of existing array
        const allAdditions = ['Bacon', ...additions, 'Olives'];

        const allDishes = ['Lasagne', 'Steak'];
        allDishes.unshift(...dishes);

        expect(all).toEqual(['Burger', 'Pizza', 'Beef', 'Salami', 'Fries', 'Sauce']);
        expect(allAdditions).toEqual(['Bacon', 'Fries', 'Sauce', 'Olives']);
        expect(allDishes).toEqual(['Burger', 'Pizza', 'Lasagne', 'Steak']);
    });
});