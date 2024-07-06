import js from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import ts from "typescript-eslint";

export default ts.config(
	{
		ignores: ["dist"],
	},
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
		},
	},
	...ts.configs.recommended
);
