describe('Promises', () => {
  // Promises built in ES6 are very similar to these in other libraries ($q for example).

  it('should simple execute function placed in \'then\'', (done) => {
    // To create promise We're using Promise constructor.
    const makeBurger = new Promise((resolve, reject) => {
      resolve('Baconburger');
    });

    makeBurger.then((burger) => {
      expect(burger).toBe('Baconburger');
      done();
    });
  });

  it('can be rejected if something goes wrong', () => {
    const makeBurger = new Promise((resolve, reject) => {
      reject('No beef :(');
    });

    // in reject case second callback should be used.
    makeBurger.then(() => {}, (reason) => {
      expect(reason).toBe('No beef :(');
    });
  });

  it('can use catch method to catch rejection', () => {
    // This example is identical with previous one.
    const makeBurger = new Promise((resolve, reject) => {
      reject('No beef :(');
    });

    // With catch method We're interested only in catching error.
    makeBurger.catch((reason) => {
      expect(reason).toBe('No beef :(');
    });
  });

  it('can be chained', () => {
    // This shorthand resolves promise with given value.
    // The same static method is provided for 'reject' - Promise.reject(reason)
    const makeBurger = Promise.resolve('CheeseBurger');
    const giveBurger = Promise.resolve(makeBurger);

    // This second promise is resolved only when firs is resolved.
    giveBurger.then((burger) => {
      expect(burger).toBe('CheeseBurger');
    });
  });

  it('is asynchronus', () => {
    let burgerReady = false;
    const makeBurger = Promise.resolve('CheeseBurger');

    makeBurger.then(() => {
      expect(burgerReady).toBe(true);
    });
    // This line is executed before 'then' even if promise is resolved immediately.
    burgerReady = true;
  });

  it('can chain then methods with multiple promises', (done) => {
    const makeBurger = () => Promise.resolve('Cheeseburger');
    const giveBurger = (burger) => Promise.resolve(`${burger} given`);
    const eatBurger = () => Promise.resolve('yummy');

    makeBurger().then((burger) => {
      expect(burger).toBe('Cheeseburger');
      return giveBurger(burger);
    }).then((result) => {
      expect(result).toBe('Cheeseburger given');
      return eatBurger();
    }).then((result) => {
      expect(result).toBe('yummy');
      done();
    });
  });

  it('can wait for all promises to resolve', (done) => {
    const makeBurger = (burger) => Promise.resolve(`${burger} is made`);
    const burgers = ['Cheeseburger', 'Baconburger', 'Hawaiiburger'];
    const burgerQueue = [];

    for (let i = 0; i < burgers.length; i++) {
      burgerQueue.push(makeBurger(burgers[i]));
    }

    // It creates new promise, it resolves to array of all resolved promises results.
    Promise.all(burgerQueue).then((results) => {
      expect(results.length).toBe(3);

      // Warning ! This order can be different if promises will resolve in different time.
      expect(results)
        .toEqual(['Cheeseburger is made', 'Baconburger is made', 'Hawaiiburger is made']);
      done();
    });
  });

  it('can resolve after firs resolve from queue', (done) => {
    const makeBurger = (burger) => Promise.resolve(`${burger} is made`);
    const burgers = ['Cheeseburger', 'Baconburger', 'Hawaiiburger'];
    const burgerQueue = [];

    for (let i = 0; i < burgers.length; i++) {
      burgerQueue.push(makeBurger(burgers[i]));
    }

    // It creates new promise, it resolves to first resolved promise result.
    Promise.race(burgerQueue).then((result) => {

      // Warning ! This result depends on which promise is resolved first and can be different!
      expect(result).toEqual('Cheeseburger is made');
      done();
    });
  });

});