import { createClient } from 'redis';

const redisClientPrototype = createClient();
type RedisClient = typeof redisClientPrototype;

export interface Store {
  ping(): Promise<string>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

export class RedisStore implements Store {
  constructor(private readonly client: RedisClient) {}

  async ping(): Promise<string> {
    return this.client.ping();
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}

export async function createRedisStore(url: string): Promise<RedisStore> {
  const client = createClient({ url });

  client.on('error', (err) => {
    console.error('Redis client error', err);
  });

  await client.connect();
  return new RedisStore(client);
}

export class InMemoryStore implements Store {
  private readonly db = new Map<string, string>();

  async ping(): Promise<string> {
    return 'PONG';
  }

  async get(key: string): Promise<string | null> {
    return this.db.get(key) ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    this.db.set(key, value);
  }
}
