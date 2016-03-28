'use strict';
describe('const keyword behavior', () => {
    // 'const' has block scope the same way as 'let'
    // it cannot be overwritten
    it('cannot be changed', () => {
        const noChange = 1;
        // noChange = 2 // SyntaxError
        expect(noChange).toBe(1);
    });

    // It can be shadowed in inner scope
    // it is not recommended to do it that way (e.g. my ESLint doesn't allow it)
    it('can be shadowed', () => {
        const x = 1;
        function doSomething() {
            let x = 2; // eslint-disable-line no-shadow, prefer-const
            return x;
        }
        expect(x).toBe(1);
        expect(doSomething()).toBe(2);
    });

    it('can have properties which can be changed', () => {
        const x = {
            y: 1,
            z: 2
        };

        // We're not changing x so it is OK.
        x.y = 3;
        x.z = 4;

        expect(x.y).toBe(3);
        expect(x.z).toBe(4);
    });
});