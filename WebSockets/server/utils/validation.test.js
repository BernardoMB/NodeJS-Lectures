const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        const res = isRealString(' ');
        expect(res).toBe(false);
    });

    it('should allow valid strings', () => {
        const res = isRealString('Omar');
        expect(res).toBe(true);
    });
});