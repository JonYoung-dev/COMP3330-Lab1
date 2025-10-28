// server/app.ts
import { Hono } from "hono";
import { authRoute } from './auth/kinde'
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { cors } from "hono/cors";
import { secureRoute } from './routes/secure'
import { uploadRoute } from './routes/upload'
import { serveStatic } from '@hono/node-server/serve-static'

export const app = new Hono();

app.use('/*', serveStatic({ root: './server/public' }));
// Global middleware
app.use("*", logger());

app.use(
  "/api/*",
  cors({
    origin: process.env.HOSTEDURL || "http://localhost:5173",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Custom timing middleware
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  // Add a response header so we can see timings in curl or other clients
  c.header("X-Response-Time", `${ms}ms`);
});

// Routes
app.get("/", (c) => c.json({ message: "OK" }));
app.get("/health", (c) => c.json({ status: "healthy" }));
app.get("/api/test", (c) => c.json({ message: "test" }));

app.route('/api/auth', authRoute)
app.route('/api/secure', secureRoute)
app.route("/api/expenses", expensesRoute);
app.route('/api/upload', uploadRoute)

// server/routes/health.ts
export const healthRoute = new Hono().get('/', (c) => c.text('ok'))

// in app.ts
// app.route('/health', healthRoute)


app.get('*', async (c, next) => {
  const url = new URL(c.req.url)
  if (url.pathname.startsWith('/api')) return next()
  // serve index.html
  return c.env?.ASSETS
    ? await c.env.ASSETS.fetch(new Request('index.html'))
    : c.html(await Bun.file('./server/public/index.html').text())
})

export default app