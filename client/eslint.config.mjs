import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Added rule override to disable <img> warning
  {
    rules: {
      "@next/next/no-img-element": "off",
      //  Allows use of 'any' type globally
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
