import { Hono } from 'hono';

const app = new Hono<{ Bindings: { DB: D1Database } }>();

// 1. THIS GETS YOUR BLOG POSTS
app.get('/api/posts', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM posts ORDER BY id DESC').all();
  return c.json(results);
});

// 2. THIS SAVES YOUR NEW BLOG POST
app.post('/api/post', async (c) => {
  const { title, content } = await c.req.json();
  await c.env.DB.prepare('INSERT INTO posts (title, content) VALUES (?, ?)')
    .bind(title, content)
    .run();
  return c.json({ status: "Success!" });
});

export default app;
