// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config")
const expoConfig = require("eslint-config-expo/flat")

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", ".expo/*"],
  },
  {
    // The repo writes Array<T>, as the web app's lint config requires.
    rules: { "@typescript-eslint/array-type": "off" },
  },
])
