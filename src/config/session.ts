import session from 'express-session';
import Redis from 'redis';
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);

const redisClient = Redis.createClient({
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

const sessionStore = process.env.NODE_ENV === 'test' ? undefined : new RedisStore({
    client: redisClient,
    prefix: 'sess:', // Optional: to add a prefix to session keys
});

export default session({
    store: sessionStore,
    secret: 'docker-express-boilerplate-api',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 90 * 24 * 60 * 60 * 1000, // 3 months
    },
});
