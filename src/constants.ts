import vscode from "vscode";

export const patternExclude = "**/node_modules/**";
export const patternPackage = "**/package.json";
export const patternWebC = "**/*.webc";

export const documentSelectorWebC: vscode.DocumentFilter = {
	language: "html",
	pattern: patternWebC,
};

export const frontMatterDelimiter = "---";
export const keywordAttributes = ["webc:if", "webc:elseif", "webc:else", "webc:for"];
