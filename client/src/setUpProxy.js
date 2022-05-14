import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/autocomplete",
    createProxyMiddleware({
      target: "https://www.jobplanet.co.kr",
      changeOrigin: true,
    })
  );
};
