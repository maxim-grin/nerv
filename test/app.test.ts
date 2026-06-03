import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { InMemoryStore } from '../src/store.js';

describe('nerv app', () => {
  const app = createApp(new InMemoryStore());

  it('returns basic app info', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'nerv',
      ok: true
    });
  });

  it('returns health', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ok: true,
      storage: 'PONG'
    });
  });

  it('writes and reads a key', async () => {
    const putResponse = await request(app)
      .put('/kv/demo')
      .send({ value: 'hello' });

    expect(putResponse.status).toBe(200);
    expect(putResponse.body).toEqual({
      ok: true,
      key: 'demo',
      value: 'hello'
    });

    const getResponse = await request(app).get('/kv/demo');

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual({
      ok: true,
      key: 'demo',
      value: 'hello'
    });
  });

  it('returns 404 for a missing key', async () => {
    const response = await request(app).get('/kv/missing');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      ok: false,
      error: 'not found'
    });
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app)
      .put('/kv/demo')
      .send({ value: '' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      ok: false,
      error: 'value must be a non-empty string'
    });
  });
});
