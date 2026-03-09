import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const toArray = (value) => (Array.isArray(value) ? value : [value]);

const eslintConfig = defineConfig([
  ...toArray(nextVitals),
  ...toArray(nextTs),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
