import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://127.0.0.1:8000/api/v1/openapi.json",
  output: {
    path: "./src/lib/api",
    lint: "eslint",
    format: "prettier"
  },
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/schemas",
    {
      dates: true,
      name: "@hey-api/transformers"
    },
    {
      enums: "javascript",
      name: "@hey-api/typescript"
    },
    {
      transformer: true,
      name: "@hey-api/sdk"
    },
    "@tanstack/react-query"
  ]
});