const commonWords = new Set(['a', 'the', 'is', 'in', 'an', 'and', 'of', 'for', 'on', 'at', 'with', 'to', 'your', 'it', 'you', 'or', 'this', 'above', 'about', 'below', 'between', 'beneath', 'down', 'from', 'off', 'like', 'near', 'behind', 'over', 'through', 'up', 'under', 'upon', 'without', 'till', 'throughout', 'into', 'but', 'by', 'among', 'are', 'thoughtfully', 'our', 'us', 'as', 'let', 'its', 'any' ]);

const shouldExcludeWord = (word) => {
    return commonWords.has(word) || !isNaN(word);
};


module.exports = shouldExcludeWord;