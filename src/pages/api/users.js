import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: "http://localhost:3000",
  pathRewrite: { "^/api": "/_next/static" },
  ws: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  proxy(req, res);
};
