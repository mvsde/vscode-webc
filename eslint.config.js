import eslint from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["dist"],
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
	eslint.configs.recommended,
	tseslint.configs.strict,
);
