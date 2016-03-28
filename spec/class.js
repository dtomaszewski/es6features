'use strict';
describe('Class', () => {
    it('Can be instantiated differently than in ES5', () => {
        // We can use class keyword instead of setting object methods in prototype.
        class Cook {
            makeBurger() {
                return 'Burger';
            }
        }

        const burgerCook = new Cook();
        expect(burgerCook.makeBurger()).toBe('Burger');
        // Behind the scenes it uses prototype
        expect(Cook.prototype.makeBurger.call(burgerCook)).toBe('Burger');
    });

    it('Can use constructor function to initialize object\'s state', () => {
        // Construction function is executed each time We create object with 'new' keyword.
        // It behaves exactly as in 'old way' but it looks much nicer.
        class Cook {
            constructor(specialization) {
                this._specialization = specialization;
            }

            getSpecialization() {
                return this._specialization;
            }
        }

        const burgerCook = new Cook('Burgers');
        const steakCook = new Cook('Steaks');

        expect(burgerCook.getSpecialization()).toBe('Burgers');
        expect(steakCook.getSpecialization()).toBe('Steaks');
        expect(Cook.prototype.getSpecialization.call(steakCook)).toBe('Steaks');
    });

    it('can use getters and setters', () => {
        // We can use getters and setters to provide some logic on get/set values.
        // We know when values are changed or collected from object instance.
        class Cook {
            // If We set specialization without underscore
            // this constructor will call setter method as well.
            constructor(specialization) {
                this.specialization = specialization;
            }

            get specialization() {
                return `Great ${this._specialization}`;
            }

            // We use underscored variable _specialization
            // to hide direct access to variable (it is still possible by object._specialization)
            // but proper way is to call object.specialization.
            set specialization (newSpecialization) {
                if (newSpecialization) {
                    this._specialization = newSpecialization;
                } else {
                    this._specialization = 'food';
                }
            }
        }

        const burgerCook = new Cook('Burgers');
        // Constructor will call setter as well and assign default value to specialization.
        const cook = new Cook();

        // It will provide error if 'set specialization()' method was not defined.
        burgerCook.specialization = 'Bacon burgers';

        expect(burgerCook.specialization).toBe('Great Bacon burgers');
        expect(cook.specialization).toBe('Great food');

        // We can also get and set _specialization property explicitly which is not proper approach
        // because it will omit getters and setters of specialization.
        expect(burgerCook._specialization).toBe('Bacon burgers');

        burgerCook._specialization = 'Hawaii burgers';
        expect(burgerCook.specialization).toBe('Great Hawaii burgers');
    });

    it('Can override method of parent class', () => {
        class Cook {
            makeDish() {
                return 'Food';
            }
        }

        class BurgerCook extends Cook {
            makeBurger() {
                // We don't want to call this.makeDish() because it will be called
                // in burgerCook context which will cause maximum call stack exceed.
                return `${super.makeDish()} : Burger`;
            }
        }

        const cook = new Cook();
        const burgerCook = new BurgerCook();

        expect(cook.makeDish()).toBe('Food');
        expect(burgerCook.makeBurger()).toBe('Food : Burger');
    });

    it('can inherit from another class', () => {
        // Parent class
        class Cook {
            constructor(specialization) {
                this.specialization = specialization;
            }

            makeDish() {
                return 'Food';
            }

            get specialization() {
                return `Great ${this._specialization}`;
            }

            set specialization (newSpecialization) {
                this._specialization = newSpecialization;
            }
        }

        // To inherit from parent class We use 'extends' keyword.
        // Child class 'Burger cook' is a Cook.
        // With inheritance We can reuse all methods from parent class in our child class.
        class BurgerCook extends Cook {
            constructor() {
                // 'super' means constructor of parent class (in this example it is Cook class).
                super('Burgers');
            }

            makeBurger() {
                // We can call other methods of superclass with 'super' keyword.
                return `Great ${super.makeDish()} - Delicious Burger`;
            }
        }

        const cook = new Cook('Pizza');
        const burgerCook = new BurgerCook();

        expect(burgerCook.specialization).toBe('Great Burgers');

        // Only burger cook has makeBurger method
        expect(cook.makeBurger).toBeUndefined();
        expect(burgerCook.makeBurger).toBeDefined();
        expect(burgerCook.makeBurger()).toBe('Great Food - Delicious Burger');

        // Both instances have makeDish method which is defined in superclass.
        expect(cook.makeDish()).toBe('Food');
        expect(burgerCook.makeDish()).toBe('Food');
    });

    it('calls superclass constructor when there is no constructor in subclass', () => {
        class Cook {
            constructor(specialization) {
                this.specialization = specialization;
            }

            get specialization() {
                return `Great ${this._specialization}`;
            }

            set specialization (newSpecialization) {
                this._specialization = newSpecialization;
            }
        }

        class PizzaCook extends Cook {
            // If empty constructor will be added here it will be called instead of superclass
            // constructor and our test will fail. To prevent this problem We should call super().

            makePizza() {
                return 'Pizza';
            }
        }

        // PizzaCook has no constructor, in such case Cook constructor method is called.
        const pizzaCook = new PizzaCook('Pepperoni');

        expect(pizzaCook.specialization).toBe('Great Pepperoni');
        expect(pizzaCook.makePizza()).toBe('Pizza');
    });

    it('Can check instance of class', () => {
        class Cook {}
        class BurgerCook extends Cook {}
        class PizzaCook extends Cook {}

        const cook = new Cook();
        const burgerCook = new BurgerCook();
        const pizzaCook = new PizzaCook();

        // To check if object is an instance of some class We use 'instanceof'.
        expect(burgerCook instanceof Cook).toBeTruthy();
        expect(burgerCook instanceof BurgerCook).toBeTruthy();
        expect(pizzaCook instanceof Cook).toBeTruthy();
        expect(pizzaCook instanceof PizzaCook).toBeTruthy();
        expect(cook instanceof Cook).toBeTruthy();
        expect(cook instanceof Object).toBeTruthy();

        expect(cook instanceof BurgerCook).toBeFalsy();
        expect(cook instanceof PizzaCook).toBeFalsy();
    });
});