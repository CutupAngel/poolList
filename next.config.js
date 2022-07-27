const DOTENV = require("dotenv-webpack");

module.exports = {
  experimental: {
    concurrentFeatures: true,
  },
  plugins: [new DOTENV()],
  images: {
    domains: ["rawcdn.githack.com"],
  },
  env: {
    GRAPH_URL: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  },
};
