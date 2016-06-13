describe('Sets', () => {
    // It is a new data structure added in ES6.

    it('have size property', () => {
        const dishSet = new Set();

        // size property allows us to check size of Set
        expect(dishSet.size).toBe(0);

        // add method is used to add keys to set.
        dishSet.add('Burger');

        expect(dishSet.size).toBe(1);
    });

    it('can have only unique keys', () => {
        const dishSet = new Set();

        expect(dishSet.size).toBe(0);

        dishSet.add('Burger');
        dishSet.add('Burger');
        dishSet.add('Burger');

        expect(dishSet.size).toBe(1);
    });

    it('allows us to use object as a keys of our set', () => {
        const dishSet = new Set();
        const burger = {price: 20};
        const secondBurger = {price: 20};

        dishSet.add(burger);

        // has() method is used to check if set has required key.
        expect(dishSet.has(burger)).toBeTruthy();
        expect(dishSet.size).toBe(1);

        // We are not allowed to add the same object but of course We can add
        // different object with the same properties.
        dishSet.add(burger);
        dishSet.add(secondBurger);
        expect(dishSet.size).toBe(2);
    });

    it('can be initialized with an array', () => {
        const dishSet = new Set(['Burger', 'Pizza', 'Ribs', 'Burger']);

        expect(dishSet.has('Burger')).toBeTruthy();
        expect(dishSet.has('Pizza')).toBeTruthy();
        expect(dishSet.has('Ribs')).toBeTruthy();
        // but still duplicates are not possible
        expect(dishSet.size).toBe(3);
    });

    it('has clear method to remove all items', () => {
        const dishSet = new Set(['Burger', 'Pizza', 'Ribs']);

        expect(dishSet.size).toBe(3);

        dishSet.clear();

        expect(dishSet.size).toBe(0);
    });

    it('has delete method to remove specific item ', () => {
        const dishSet = new Set(['Burger', 'Pizza', 'Ribs']);
        const cooksSet = new Set();
        const burgerCook = {experience: 5};

        cooksSet.add(burgerCook);

        // We're simply using key name to remove it from set.
        dishSet.delete('Burger');

        expect(dishSet.size).toBe(2);
        expect(dishSet.has('Burger')).toBeFalsy();

        // If We try to remove object with the same properties it will fail.
        cooksSet.delete({experience: 5});
        expect(cooksSet.size).toBe(1);

        // To remove this key We have to use the same object.
        cooksSet.delete(burgerCook);
        expect(cooksSet.size).toBe(0);
    });

    it('can use forEach method to iterate over set items ', () => {
        // We got to be careful with this method because it does not guarantee
        // order as it is in for example array.
        const dishSet = new Set(['Burger', 'Pizza', 'Ribs']);
        const dishArray = [];
        dishSet.forEach(dish => dishArray.push(dish));

        expect(dishArray).toEqual(['Burger', 'Pizza', 'Ribs']);
    });

    it('can also use \'for of\' to iterate over Set', () => {
        const dishSet = new Set(['Burger', 'Pizza', 'Ribs']);
        const dishArray = [];

        for (const dish of dishSet) {
            dishArray.push(dish);
        }

        expect(dishArray).toEqual(['Burger', 'Pizza', 'Ribs']);
    });

    it('can use entries method to use an iterator', () => {
        const dishSet = new Set();
        dishSet.add('Burger');
        dishSet.add({price: 20});

        const entries = dishSet.entries();

        // To receive value from iterator We have to use value property of iterator.
        // For more information look into generators.js, iterable.js or iterators.js.
        const firstDish = entries.next().value;

        // We receive two values from Set, both are equal to key.
        expect(firstDish).toEqual(['Burger', 'Burger']);

        // The same behavior occurs for objects.
        const secondDish = entries.next().value;
        expect(secondDish).toEqual([{price: 20}, {price: 20}]);
    });

    it('can also use values method to use iterator', () => {
        const dishSet = new Set();
        dishSet.add('Burger');
        dishSet.add({price: 20});

        const values = dishSet.values();
        const firstDish = values.next().value;
        // In this case We're expecting single key value.
        expect(firstDish).toEqual('Burger');

        const secondDish = values.next().value;
        expect(secondDish).toEqual({price: 20});
    });

    it('can be duplicated', () => {
        const dishSet = new Set();
        dishSet.add('Burger');

        // It will copy dishSet into secondDishSet.
        const secondDishSet = new Set(dishSet);

        // It is not the same set.
        expect(dishSet).not.toBe(secondDishSet);

        // But it has the same keys inside.
        expect(secondDishSet.has('Burger')).toBeTruthy();
        expect(secondDishSet.size).toBe(1);

        // It can be also constructed with using iterator
        const thirdDishSet = new Set(dishSet.values());

        expect(dishSet).not.toBe(thirdDishSet);
        expect(thirdDishSet.has('Burger')).toBeTruthy();
        expect(thirdDishSet.size).toBe(1);
    });
});