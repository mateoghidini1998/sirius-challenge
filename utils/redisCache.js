const Redis = require('ioredis');
const redis = new Redis();

//Function to add the array of words to a redis set.
async function addWordsToSet(words){
    console.log(words)
    //Check if words is empty
    if (words.length === 0) {
        console.log("No words to add to the set.");
        return;
    }
    return await redis.sadd('wordCloudSet', ...words);
}

//Function to get all the words in the redis set
async function getWordsFromSet(){
    return await redis.smembers('wordCloudSet');
}


module.exports = {
    //Function to get the data stored in redis
    getFromCache: async (key) => {
        const cachedData = await redis.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    },
    //Function to store data in redis cache
    setToCache: async (key, ttl, data) => {
        await redis.setex(key, ttl ,JSON.stringify(data) );
    },
    addWordsToSet,
    getWordsFromSet
};