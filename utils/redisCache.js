const Redis = require('ioredis');
const redis = new Redis();

module.exports = {
    getFromCache: async (key) => {
        const cachedData = await redis.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    },
    setToCache: async (key, ttl, data) => {
        await redis.setex(key, ttl ,JSON.stringify(data) );
    },
};