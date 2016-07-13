describe('WeakMaps', () => {
  // WeakMaps are specific maps which do not have strong pointers.
  // There are some differences between WeakMap and Map.

  it('doesn\'t have all Map properties', () => {
    const weakBurgerMap = new WeakMap();

    expect(weakBurgerMap.size).not.toBeDefined();
    expect(weakBurgerMap.entries).not.toBeDefined();
    expect(weakBurgerMap.keys).not.toBeDefined();
    expect(weakBurgerMap.values).not.toBeDefined();
    expect(weakBurgerMap.forEach).not.toBeDefined();
    expect(weakBurgerMap.clear).not.toBeDefined();
  });

  it('has \'has\' function to find items (like regular Map)', () => {
    const weakBurgerMap = new WeakMap();
    const burger = {type: 'Cheeseburger'};

    weakBurgerMap.set(burger, '10$');

    expect(weakBurgerMap.has(burger)).toBe(true);
  });

  it('has \'get\' function to get value (like regular Map)', () => {
    const weakBurgerMap = new WeakMap();
    const burger = {type: 'Cheeseburger'};

    weakBurgerMap.set(burger, '10$');

    expect(weakBurgerMap.get(burger)).toBe('10$');
  });

  it('has \'delete\' function to delete an item (like regular Set)', () => {
    const weakBurgerMap = new WeakMap();
    const cheeseBurger = {type: 'Cheeseburger'};
    const baconBurger = {type: 'Baconburger'};

    weakBurgerMap.set(cheeseBurger, '8$');
    weakBurgerMap.set(baconBurger, '10$');

    expect(weakBurgerMap.has(cheeseBurger)).toBe(true);
    expect(weakBurgerMap.has(baconBurger)).toBe(true);

    weakBurgerMap.delete(cheeseBurger);

    expect(weakBurgerMap.has(cheeseBurger)).toBe(false);
    expect(weakBurgerMap.has(baconBurger)).toBe(true);
  });

  it('is different from Map because it lets garbage collector to clear it\'s items', () => {
    const pizzaMap = new Map();
    const burgerMap = new WeakMap();

    (function() {
      const salamiPizza = {type: 'Salami'};
      const carbonaraPizza = {type: 'Carbonara'};
      const cheeseBurger = {type: 'Cheeseburger'};
      const baconBurger = {type: 'BaconBurger'};

      pizzaMap.set(salamiPizza, '10$');
      pizzaMap.set(carbonaraPizza, '8$');
      burgerMap.set(cheeseBurger, '12$');
      burgerMap.set(baconBurger, '16$');
    }());

    // Regular map preserves it's values outside of internal scope.
    // Garbage collector can't remove it.
    // WeakMap doesn't have these values any more, garbage collector removed it.
    // We also cannot print WeakMap values here because We'll need a key.
    expect(pizzaMap.size).toBe(2);
  });
});