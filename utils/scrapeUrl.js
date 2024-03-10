const axios = require("axios");
const cheerio = require("cheerio");

const scrapeUrl = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const description = $('#productDescription > p').first().text();

        return description;
    } catch (error) {
        throw new Error(`Failed to fetch and scrape URL: ${error.message}`);
    }
};

module.exports = scrapeUrl;
