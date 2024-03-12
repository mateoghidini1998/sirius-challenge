const Redis = require('ioredis');
const redisCache = require('../../utils/redisCache');

jest.mock('ioredis');

describe('redisCache', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should get data from cache', async () => {
    const key = 'testKey';
    const mockData = { example: 'data' };

    // Mock Redis 'get' method
    Redis.prototype.get.mockResolvedValueOnce(JSON.stringify(mockData));

    const result = await redisCache.getFromCache(key);

    expect(result).toEqual(mockData);
    expect(Redis.prototype.get).toHaveBeenCalledWith(key);
  });

  it('should return null if data is not in cache', async () => {
    const key = 'nonExistentKey';

    // Mock Redis 'get' method to return null
    Redis.prototype.get.mockResolvedValueOnce(null);

    const result = await redisCache.getFromCache(key);

    expect(result).toBeNull();
    expect(Redis.prototype.get).toHaveBeenCalledWith(key);
  });

  it('should set data to cache with TTL', async () => {
    const key = 'testKey';
    const ttl = 60;
    const mockData = { example: 'data' };

    // Mock Redis 'setex' method
    Redis.prototype.setex.mockResolvedValueOnce('OK');

    await redisCache.setToCache(key, ttl, mockData);

    expect(Redis.prototype.setex).toHaveBeenCalledWith(key, ttl, JSON.stringify(mockData));
  });

  it('should add words to the Redis set', async () => {
    const words = ['word1', 'word2', 'word3'];

    // Mock Redis 'sadd' method
    Redis.prototype.sadd.mockResolvedValueOnce(3); // Assuming 3 words were added

    await redisCache.addWordsToSet(words);

    expect(Redis.prototype.sadd).toHaveBeenCalledWith('wordCloudSet', ...words);
  });

  it('should get all words from the Redis set', async () => {
    // Mock Redis 'smembers' method
    const mockWords = ['word1', 'word2', 'word3'];
    Redis.prototype.smembers.mockResolvedValueOnce(mockWords);

    const result = await redisCache.getWordsFromSet();

    expect(result).toEqual(mockWords);
    expect(Redis.prototype.smembers).toHaveBeenCalledWith('wordCloudSet');
  });
});
