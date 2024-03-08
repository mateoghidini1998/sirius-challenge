const axios = require("axios");
const cheerio = require("cheerio");

//@route   POST /product-word-cloud
//@desc    Create product word cloud
//@access  Public

exports.getData = async (req, res) => {
    const commonWords = new Set(['a', 'the', 'is', 'in', 'an', 'and', 'of', 'for', 'on', 'at', 'with']);
    const url = req.body.url;
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const description = $('#productDescription > p').first().text();
        const words = description.split(/\W+/).map(word => word.toLowerCase()).filter(word => word && !commonWords.has(word));
        const wordCount = words.reduce((counts, word) => ({...counts, [word]: (counts[word] || 0) + 1}), {});
        const wordCloud = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 10);;
        res.send(wordCloud);
    } catch (error) {
        res.status(500).send(error.message);
    }
};