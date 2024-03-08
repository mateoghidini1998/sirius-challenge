const axios = require("axios");
const cheerio = require("cheerio");
const NodeCache = require("node-cache");

const urlCache = new NodeCache({ stdTTL: 600 });

//@route   POST /product-word-cloud
//@desc    Create product word cloud
//@access  Public


exports.getData = async (req, res) => {
    const commonWords = new Set(['a', 'the', 'is', 'in', 'an', 'and', 'of', 'for', 'on', 'at', 'with', 'to', 'your', 'it', 'you ']);

    const shouldExcludeWord = (word) => {
        return commonWords.has(word) || !isNaN(word);
    }

    const url = req.body.url;

    //Check if there is an url
    if (!url) {
        return res.status(400).send("URL is missing");
    }

    //Verify if the urls are already stored in cache.
    let cachedData = urlCache.get(url);
    if (cachedData) {
        console.log("Data retrieved from cache");
        return res.send(cachedData);
    } else {
        try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
                }
            });

            const html = response.data;
            const $ = cheerio.load(html);

            //Target the selector to scrap from the product.
            const description = $('#productDescription > p').first().text();

            //Sort and filter the words from the description.
            const words = description.split(/\W+/).map(word => word.toLowerCase()).filter(word => word && !shouldExcludeWord(word));
            const wordCount = words.reduce((counts, word) => ({...counts, [word]: (counts[word] || 0) + 1}), {});

            const wordCloud = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

            //Set a key and value to store in cache
            urlCache.set(url, wordCloud);

            
            return res.send(wordCloud);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
};
