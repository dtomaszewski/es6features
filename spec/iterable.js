'use strict';
describe('Iterable', () => {
    // Iterables are object which prototype has @@iterator method.
    // Built in iterables are for example String, Array, TypedArray, Map and Set.
    // We can also build our own iterable object.
    it('can be built using Symbol.iterator', () => {
        class DishIterator {
            constructor(array) {
                this.array = array;
                this.index = 0;
            }

            // next() method can make some logic like sorting, reverse order etc.
            next() {
                // Result object should have 'value' and 'done' properties.
                // Done informs if current element is last one.
                const result = {
                    value: undefined,
                    done: true
                };

                if (this.index < this.array.length) {
                    if (this.index === this.array.length - 1) {
                        result.value = `and ${this.array[this.index]}`;
                    } else {
                        result.value = this.array[this.index];
                    }
                    result.done = false;
                    this.index += 1;
                }
                return result;
            }
        }

        // We can create our own iterable object.
        class Cook {
            constructor() {
                this.dishes = [];
            }

            addDish(...dishes) {
                this.dishes = this.dishes.concat(dishes);
            }
            // We give access to iterate over our array without giving direct access to it,
            // as long as DishIterator's next() method can make some logic We have iteration
            // totally under control.
            [Symbol.iterator]() {
                // Object returned in this method has to have next() method built in.
                return new DishIterator(this.dishes);
            }
        }

        const cook = new Cook();
        cook.addDish('Pizza', 'Steak', 'Burger');

        let text = 'Our cook can make';

        // 'for of' loops iterates over collection using
        // Cook class Symbol.iterator and it's next() method.
        for (const dish of cook) {
            text = `${text} ${dish}`;
        }

        // We can manually get iterator and call next() methods of our iterable object.
        const iterator = cook[Symbol.iterator]();

        expect(text).toBe('Our cook can make Pizza Steak and Burger');
        expect(cook[Symbol.iterator]).toEqual(jasmine.any(Function));
        expect(cook[Symbol.iterator]().next).toEqual(jasmine.any(Function));

        expect(iterator.next()).toEqual({value: 'Pizza', done: false});
        expect(iterator.next()).toEqual({value: 'Steak', done: false});
        expect(iterator.next()).toEqual({value: 'and Burger', done: false});
        expect(iterator.next()).toEqual({value: undefined, done: true});
    });
});