describe('WeakSets', () => {
  // WeakSets are specific sets which do not have strong pointers.
  // There are some differences between WeakSet and Set.

  it('doesn\'t have all Set properties', () => {
    const weakBurgerSet = new WeakSet();

    expect(weakBurgerSet.size).not.toBeDefined();
    expect(weakBurgerSet.entries).not.toBeDefined();
    expect(weakBurgerSet.keys).not.toBeDefined();
    expect(weakBurgerSet.values).not.toBeDefined();
    expect(weakBurgerSet.forEach).not.toBeDefined();
    expect(weakBurgerSet.clear).not.toBeDefined();
  });

  it('has \'has\' function to find items (like regular Set)', () => {
    const weakBurgerSet = new WeakSet();
    const burger = {type: 'Cheeseburger'};

    weakBurgerSet.add(burger);

    expect(weakBurgerSet.has(burger)).toBe(true);
  });

  it('has \'delete\' function to delete an item (like regular Set)', () => {
    const weakBurgerSet = new WeakSet();
    const cheeseBurger = {type: 'Cheeseburger'};
    const baconBurger = {type: 'Baconburger'};

    weakBurgerSet.add(cheeseBurger);
    weakBurgerSet.add(baconBurger);

    expect(weakBurgerSet.has(cheeseBurger)).toBe(true);
    expect(weakBurgerSet.has(baconBurger)).toBe(true);

    weakBurgerSet.delete(cheeseBurger);

    expect(weakBurgerSet.has(cheeseBurger)).toBe(false);
    expect(weakBurgerSet.has(baconBurger)).toBe(true);
  });

  it('is different from Set because it lets garbage collector to clear it\'s items', () => {
    const pizzaSet = new Set();
    const burgerSet = new WeakSet();

    (function() {
      const salamiPizza = {type: 'Salami'};
      const carbonaraPizza = {type: 'Carbonara'};
      const cheeseBurger = {type: 'Cheeseburger'};
      const baconBurger = {type: 'BaconBurger'};

      pizzaSet.add(salamiPizza);
      pizzaSet.add(carbonaraPizza);
      burgerSet.add(cheeseBurger);
      burgerSet.add(baconBurger);
    }());

    // Regular set preserves it's values outside of internal scope.
    // Garbage collector can't remove it.
    // WeakSet doesn't have these values any more, garbage collector removed it.
    // We also cannot print WeakSet values here because We'll need a key.
    expect(pizzaSet.size).toBe(2);
  });
});