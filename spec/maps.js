describe('Map', () => {
    // It is designed to hold collections of key-value pairs.

    it('has size property', () => {
        const dishMap = new Map();

        // size property allows us to check size of Set
        expect(dishMap.size).toBe(0);

        // set method is used to add key-value pairs to map.
        dishMap.set('Burger', 'CheeseBurger');

        expect(dishMap.size).toBe(1);
    });

    it('has get method', () => {
        // get() method retrieves value for given key.
        const dishMap = new Map();
        dishMap.set('Burger', 'CheeseBurger');

        expect(dishMap.get('Burger')).toBe('CheeseBurger');
    });

    it('can have only unique keys', () => {
        const dishMap = new Map();

        expect(dishMap.size).toBe(0);

        dishMap.set('Burger', 'CheeseBurger');
        dishMap.set('Burger', 'HawaiiBurger');
        dishMap.set('Burger', 'BaconBurger');

        expect(dishMap.size).toBe(1);
        // It overwrites value for repeated key.
        expect(dishMap.get('Burger')).toBe('BaconBurger');
    });

    it('allows us to use object as a keys of our map', () => {
        const priceMap = new Map();
        const burger = {type: 'CheeseBurger'};

        priceMap.set(burger, 20);

        expect(priceMap.get(burger)).toBe(20);
    });

    it('can be initialized with arrays', () => {
        // We use array of key-value pair arrays
        const priceMap = new Map([['CheeseBurger', 20], ['BaconBurger', 100], ['HawaiiBurger', 5]]);

        expect(priceMap.size).toBe(3);
        expect(priceMap.get('CheeseBurger')).toBe(20);
        expect(priceMap.get('BaconBurger')).toBe(100);
        expect(priceMap.get('HawaiiBurger')).toBe(5);
    });

    it('has a \'has\' method to check if key is in the map', () => {
        const priceMap = new Map([['CheeseBurger', 20], ['BaconBurger', 100], ['HawaiiBurger', 5]]);

        expect(priceMap.has('CheeseBurger')).toBe(true);
        expect(priceMap.has('BaconBurger')).toBe(true);
        expect(priceMap.has('HawaiiBurger')).toBe(true);
    });

    it('has a clear method to remove all items from the map', () => {
        const priceMap = new Map([['CheeseBurger', 20], ['BaconBurger', 100], ['HawaiiBurger', 5]]);

        expect(priceMap.size).toBe(3);

        priceMap.clear();

        expect(priceMap.size).toBe(0);
    });

    it('has delete method to remove specific item ', () => {
        const priceMap = new Map([['CheeseBurger', 20], ['BaconBurger', 100], ['HawaiiBurger', 5]]);
        const cooksMap = new Map();
        const burgerCook = {experience: 5};

        cooksMap.set(burgerCook, 'great');

        // We're simply using key name to remove it from set.
        priceMap.delete('CheeseBurger');

        expect(priceMap.size).toBe(2);
        expect(priceMap.has('Burger')).toBeFalsy();

        // If We try to remove object with the same properties it will fail.
        cooksMap.delete({experience: 5});
        expect(cooksMap.size).toBe(1);

        // To remove this key We have to use the same object.
        cooksMap.delete(burgerCook);
        expect(cooksMap.size).toBe(0);
    });

    it('can use forEach method to iterate over set items ', () => {
        // We got to be careful with this method because it does not guarantee
        // order as it is in for example array.
        const dishMap = new Map([['CheeseBurger', 20], ['BaconBurger', 100], ['HawaiiBurger', 5]]);
        const priceArray = [];
        const burgerArray = [];

        // It has value and key available in each iteration.
        dishMap.forEach((value, key) => {
            priceArray.push(value);
            burgerArray.push(key);
        });

        expect(priceArray).toEqual([20, 100, 5]);
        expect(burgerArray).toEqual(['CheeseBurger', 'BaconBurger', 'HawaiiBurger']);
    });

    it('can also use \'for of\' to iterate over Set', () => {
        const dishMap = new Map([['CheeseBurger', 20], ['BaconBurger', 100], ['HawaiiBurger', 5]]);
        const priceArray = [];
        const burgerArray = [];

        for (let [key, value] of dishMap) { // eslint-disable-line prefer-const
            priceArray.push(value);
            burgerArray.push(key);
        }

        expect(priceArray).toEqual([20, 100, 5]);
        expect(burgerArray).toEqual(['CheeseBurger', 'BaconBurger', 'HawaiiBurger']);
    });

    it('can use entries method to iterate over whole entries', () => {
        const dishMap = new Map();
        dishMap.set('Burger', 'CheeseBurger');
        dishMap.set({price: 20}, 'HawaiiBurger');

        const entries = dishMap.entries();

        // To receive value from iterator We have to use value property of iterator.
        // For more information look into generators.js, iterable.js or iterators.js.
        const firstDish = entries.next().value;

        expect(firstDish).toEqual(['Burger', 'CheeseBurger']);

        // The same behavior occurs for objects.
        const secondDish = entries.next().value;
        expect(secondDish).toEqual([{price: 20}, 'HawaiiBurger']);
    });

    it('can also use values method to iterate over values', () => {
        const dishMap = new Map();
        dishMap.set('Burger', 'CheeseBurger');
        dishMap.set({price: 20}, 'HawaiiBurger');

        const values = dishMap.values();
        const firstDish = values.next().value;

        // In this case We're expecting only value of map item.
        expect(firstDish).toEqual('CheeseBurger');

        const secondDish = values.next().value;
        expect(secondDish).toEqual('HawaiiBurger');
    });

    it('can also use keys method to iterate over the keys', () => {
        const dishMap = new Map();
        dishMap.set('Burger', 'CheeseBurger');
        dishMap.set({price: 20}, 'HawaiiBurger');

        const values = dishMap.keys();
        const firstDish = values.next().value;

        // In this case We're expecting only value of map item.
        expect(firstDish).toEqual('Burger');

        const secondDish = values.next().value;
        expect(secondDish).toEqual({price: 20});
    });

    it('can be duplicated', () => {
        const dishMap = new Map();
        dishMap.set('Burger', 'CheeseBurger');


        // It will copy dishSet into secondDishSet.
        const secondDishMap = new Map(dishMap);

        // It is not the same map.
        expect(dishMap).not.toBe(secondDishMap);

        // But it has the same keys inside.
        expect(secondDishMap.has('Burger')).toBeTruthy();
        expect(secondDishMap.size).toBe(1);

        // It can be also constructed with using iterator.
        // Unlike in set it is created with whole entries.
        const thirdDishMap = new Map(dishMap.entries());

        expect(dishMap).not.toBe(thirdDishMap);
        expect(thirdDishMap.has('Burger')).toBeTruthy();
        expect(thirdDishMap.size).toBe(1);
    });
});