const Redis = require('ioredis');
const redis = new Redis();
const ErrorResponse = require('../utils/errorResponse')
const commonWords = require('../utils/commonWords')
const asyncHandler = require('../middleware/async')
const scrapeUrl = require('../utils/scrapeUrl')


//@route   POST /product-word-cloud
//@desc    Create product word cloud
//@access  Public
exports.getData = asyncHandler(async (req, res, next) => {
    const shouldExcludeWord = (word) => {
        return commonWords.has(word) || !isNaN(word);
    }

    const url = req.body.url;

    //Check if there is an url
    if (!url) {
        return next(new ErrorResponse('Please provide a url', 400))
    }

    //Verify if the urls are already stored in cache.
    let cachedData = await redis.get(url);
    if (cachedData) {
        console.log("Data retrieved from cache");
        return res.send(JSON.parse(cachedData))
    } else {
        
        //Target the selector to scrap from the product.
        const description = await scrapeUrl(url);

        //Sort and filter the words from the description.
        const words = description.split(/\W+/).map(word => word.toLowerCase()).filter(word => word && word.length > 1 && !shouldExcludeWord(word)).slice(0, 20);
        console.log(words);
        const wordCount = words.reduce((counts, word) => ({...counts, [word]: (counts[word] || 0) + 1}), {});

        const wordCloud = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

        //Set a key and value to store in cache
        await redis.set(url, JSON.stringify(wordCloud));

        return res.send(wordCloud);
    }
});
