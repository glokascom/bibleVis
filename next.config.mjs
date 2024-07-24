import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  webpack(config) {
    config.resolve.alias["@"] = resolve(__dirname, "app");
    return config;
  },
};

export default nextConfig;
