import express from 'express';
import type { Store } from './store.js';

export function createApp(store: Store) {
  const app = express();

  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ name: 'nerv', ok: true });
  });

  app.get('/health', async (_req, res) => {
    try {
      const storage = await store.ping();
      res.status(200).json({ ok: true, storage });
    } catch (error) {
      res.status(503).json({
        ok: false,
        error: error instanceof Error ? error.message : 'unknown error'
      });
    }
  });

  app.put('/kv/:key', async (req, res) => {
    const value = req.body?.value;

    if (typeof value !== 'string' || value.length === 0) {
      return res.status(400).json({
        ok: false,
        error: 'value must be a non-empty string'
      });
    }

    await store.set(req.params.key, value);

    return res.status(200).json({
      ok: true,
      key: req.params.key,
      value
    });
  });

  app.get('/kv/:key', async (req, res) => {
    const value = await store.get(req.params.key);

    if (value === null) {
      return res.status(404).json({
        ok: false,
        error: 'not found'
      });
    }

    return res.status(200).json({
      ok: true,
      key: req.params.key,
      value
    });
  });

  return app;
}
