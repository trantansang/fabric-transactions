const redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL);
const {promisify} = require("util");
client.on("error", function (error) {
    console.error(`Redis error: ${error}`);
});
module.exports = {
    'hgetall': promisify(client.hgetall).bind(client),
    'hmset': promisify(client.hmset).bind(client),
    'keys': promisify(client.keys).bind(client),
}