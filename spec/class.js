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
    });
});