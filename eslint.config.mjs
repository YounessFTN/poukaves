import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Exemple d'ignorer certaines règles
      "@typescript-eslint/no-unused-vars": "off", // Désactive la règle no-unused-vars
      "react-hooks/exhaustive-deps": "warn", // Modifie le niveau de cette règle
    },
  },
];

export default eslintConfig;
