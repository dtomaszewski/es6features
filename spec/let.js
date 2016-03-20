'use strict'
describe(' let keyword behavior ', () => {
    // 'let' allows us to declare variables where We need them
    // it avoids hoisting, and give us block scoping.
    it('provides block scope', () => {
        // Opposite to 'var' keyword 'let' provides block scope for variable
        // x is returned as 2 because it is overwritten in block scope of 'if' statement
        // y is overwritten in 'if' statement because it is in 'doSomething' function scope.
        function doSomething(flag) {
            let x = 2; // eslint-disable-line prefer-const
            var y = 2; // eslint-disable-line block-scoped-var, no-var
            if (flag) {
                // eslint-disable-next-line prefer-const, no-unused-vars, no-shadow
                let x = 4;
                // eslint-disable-next-line no-unused-vars, no-redeclare, vars-on-top, no-var
                var y = 4;
            }
            return {x, y}; // eslint-disable-line block-scoped-var
        }
        expect(doSomething(true).x).toBe(2);
        expect(doSomething(true).y).toBe(4);
    });

    it('provides block scope in "for" loop', () => {
        // We have the same situation in 'for' loop
        // If We declare variable with var keyword it will be overwritten
        // opposite to 'let' keyword declaration.
        function doSomething() {
            var i = 1; // eslint-disable-line block-scoped-var, no-var
            let j = 1; // eslint-disable-line prefer-const
            // eslint-disable-next-line vars-on-top, no-var, no-redeclare, no-empty
            for (var i = 0; i < 5; i++) {}
            // eslint-disable-next-line no-shadow, no-empty
            for (let j = 0; j < 5; j++) {}

            return {i, j}; // eslint-disable-line block-scoped-var
        }
        expect(doSomething().i).toBe(5);
        expect(doSomething().j).toBe(1);
    });
});