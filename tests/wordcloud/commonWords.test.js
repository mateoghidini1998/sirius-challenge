const shouldExcludeWord = require('../../utils/commonWords');

describe('shouldExcludeWord', () => {
    it('should exclude common words', () => {
        const commonWords = 'the';
        const result = shouldExcludeWord(commonWords);
        expect(result).toBe(true);
    });

    it('should not exclude common words', () => {
        const uncommonWord = 'example';
        const result = shouldExcludeWord(uncommonWord);
        expect(result).toBe(false);
    });

    it('should exclue numbers', () => {
        const numericString = '123';
        const result = shouldExcludeWord(numericString);
        expect(result).toBe(true);
    });
})