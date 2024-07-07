import fs from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const inputDir = "./src/data";
const outputDir = "./dist/data";

await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(inputDir);

for (const file of files) {
	const name = path.basename(file, path.extname(file));

	const inputPath = `${inputDir}/${file}`;
	const inputContents = await fs.readFile(inputPath, { encoding: "utf-8" });

	const outputPath = `${outputDir}/${name}.html-data.json`;
	const outputContents = YAML.parse(inputContents);

	await fs.writeFile(outputPath, JSON.stringify(outputContents, null, "\t"));
}
