import fs from "node:fs/promises";
import express from "express";
import { createI18nInstance } from "./i18n.server.js";
import i18nextMiddleware from "i18next-http-middleware";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 8003;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";

// Create http server
const app = express();
app.use(cookieParser());

app.use(
  "/api",
  proxy("https://194.67.125.199:8443/", {
    userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
      if (
        (userReq.url === "/auth" || userReq.url === "/refresh") &&
        userRes.statusCode === 200
      ) {
        headers["set-cookie"][0] += "; path=/";
      }
      // recieves an Object of headers, returns an Object of headers.
      return headers;
    },
  }),
);

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.use((req, res, next) => {
  // создаём новый экземпляр i18n
  const i18nInstance = createI18nInstance();

  // подключаем middleware, передавая наш экземпляр
  i18nextMiddleware.handle(i18nInstance)(req, res, next);
});

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "/");

    /** @type {string} */
    let template;
    /** @type {import('./src/entry-server.ts').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, req.i18n, req.cookies);

    if (rendered.returnCookie) {
      res.set("Set-Cookie", `${rendered.returnCookie};path=/`);
    }

    const html = template
      .replace(
        `<!--i18n-head-->`,
        `
        <script>
            window.initialLanguage = '${req.i18n.language}';
        </script>
      `,
      )
      .replace(
        `<!--preloaded-state-->`,
        `
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(rendered.state).replace(/</g, "\\u003c")};
        </script>
        `,
      )
      .replace(`<!--i18n-lang-->`, req.i18n.language)
      .replace(`<!--home-head-->`, rendered.head ?? "")
      .replace(`<!--home-body-->`, rendered.body ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
const server = app.listen(port, () => {
  console.log(`Server started at https://frontend-wmyr.onrender.com/`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
