import session from 'express-session';
import IORedis from 'ioredis';
import RedisStore from 'connect-redis';

const redisClient = new IORedis({
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT || "6379", 10)
});

export default session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 3, // 3 hours
    },
});