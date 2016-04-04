'use strict';
describe('Numbers', () => {
    it('has new literal for octal numbers', () => {
        // It is constructed with leading 0 and letter o (case is irrelevant).
        const octal = 0o71;
        const octalUppercase = 0O71;
        // It can be also converted with built in Number class.
        // In this case We're using string.
        const octalNumber = Number('0o71');

        expect(octal).toBe(57);
        expect(octalUppercase).toBe(57);
        expect(octalNumber).toBe(57);
    });
    
    it('has new literal for binary numbers', () => {
        // It is constructed with leading 0 and letter b (case is irrelevant).
        const binary = 0b00111001;
        const binaryUppercase = 0b00111001;
        const binaryNumber = Number('0b00111001');

        expect(binary).toBe(57);
        expect(binaryUppercase).toBe(57);
        expect(binaryNumber).toBe(57);
    });

    it('has parseInt and parseFloat methods in Number object', () => {
        // It is more descriptive to have these methods in Number object than in global scope.
        const numberInt = Number.parseInt('57', 10);
        const numberFloat = Number.parseFloat('57.57');

        expect(numberInt).toBe(57);
        expect(numberFloat).toBe(57.57);
    });

    it('has isFinite method with slightly different functionality', () => {
        // Old use of 'isFinite' first converts string value to number
        // and then checks if it is finite.
        const oldFinite = isFinite('57');
        // Number.isFinite has no conversion and this number is checked as a string.
        const newFinite = Number.isFinite('57');

        expect(oldFinite).toBeTruthy();
        expect(newFinite).toBeFalsy();
    });

    it('has isNaN method with slightly different functionality', () => {
        // It works similarly as isFinite, first runs the conversion and then checks
        // if value is NaN.
        const oldNaN = isNaN('NaN');
        // Here no conversion is run before checking for NaN.
        const newNaN = Number.isNaN('NaN');

        expect(oldNaN).toBeTruthy();
        expect(newNaN).toBeFalsy();
    });

    it('has new \'isInteger\' method', () => {
        const isInteger = Number.isInteger(57);
        const isIntegerWithDot = Number.isInteger(57.0);
        const isNotInteger = Number.isInteger(57.57);

        expect(isInteger).toBeTruthy();
        expect(isIntegerWithDot).toBeTruthy();
        expect(isNotInteger).toBeFalsy();
    });

    it('has max and min safe integer constants exposed', () => {
        // It is needed to prevent situations that these two below numbers
        // are considered equal by JavaScript.
        const big = Math.pow(2, 157) + 75;
        const bigger = Math.pow(2, 157) + 57;
        // We are also allowed to use isSafeInteger method to check if our integer is safe.
        const isSafe = Number.isSafeInteger(9007199254740991);
        const isNotSafe = Number.isSafeInteger(9007199254740992);

        expect(big).toEqual(bigger);
        // Now We are sure when We're working with safe integers.
        expect(Number.MAX_SAFE_INTEGER).toBe(Math.pow(2, 53) - 1);
        expect(Number.MIN_SAFE_INTEGER).toBe(Math.pow(2, 53) * -1 + 1);
        expect(isSafe).toBeTruthy();
        expect(isNotSafe).toBeFalsy();
    });
});