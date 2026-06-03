import { createApp } from './app.js';
import { createRedisStore } from './store.js';

const port = Number(process.env.PORT ?? 3000);
const redisUrl = process.env.REDIS_URL ?? 'redis://redis:6379';

const store = await createRedisStore(redisUrl);
const app = createApp(store);

app.listen(port, () => {
  console.log(`nerv listening on ${port}`);
});
