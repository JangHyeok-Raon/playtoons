const {
  override,
  addWebpackAlias,
  addWebpackPlugin,
} = require("customize-cra");
const Dotenv = require("dotenv-webpack");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      "@IMAGES": path.resolve(__dirname, "src/assets/images"),
      "@ICONS": path.resolve(__dirname, "src/assets/images/icons"),
      "@LINES": path.resolve(__dirname, "src/assets/images/lines"),
      "@CONTAINERS": path.resolve(__dirname, "src/containers"),
      "@COMPONENTS": path.resolve(__dirname, "src/components"),
      "@COMMON": path.resolve(__dirname, "src/common"),
      "@API": path.resolve(__dirname, "src/services"),
      "@REDUX": path.resolve(__dirname, "src/modules/redux"),
    }),
    addWebpackPlugin(new Dotenv({ path: `./config/${NODE_ENV}.env` }))
  ),
};
