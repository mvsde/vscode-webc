import process from "node:process";

import esbuild from "esbuild";

const isProduction = process.argv.includes("--production");
const isWatch = process.argv.includes("--watch");

try {
	const context = await esbuild.context({
		entryPoints: ["./src/extension.ts"],
		bundle: true,
		format: "cjs",
		minify: isProduction,
		sourcemap: true,
		platform: "node",
		outfile: "./dist/extension.js",
		external: ["vscode"],
		logLevel: "info",
	});

	if (isWatch) {
		await context.watch();
	} else {
		await context.rebuild();
		await context.dispose();
	}
} catch (error) {
	console.error(error);
	process.exit(1);
}
