# Contributing

## Getting started

Install dependencies with:

```sh
npm install
```

Start the compiler watch task:

```sh
node --run watch
```

- Inside VS Code press <kbd>F5</kbd> to open a new window with the extension loaded.
- Set breakpoints in your code to debug the extension.
- Find output from the extension in the debug console.

## Make changes

- You can relaunch the extension from the debug toolbar after changing code.
- You can also reload (<kbd>Ctrl</kbd> + <kbd>R</kbd> or <kbd>Cmd</kbd> + <kbd>R</kbd> on Mac) the _Extension Development Host_ VS Code window to load your changes.

## Explore the VS Code API

You can see the full set of the VS code API when you open the file [`node_modules/@types/vscode/index.d.ts`](node_modules/@types/vscode/index.d.ts).

## Check code

The following command runs linting, type and format checking:

```sh
node --run check
```

Format all code with:

```sh
node --run format
```

## Create a release

Bump the package version and generate a changelog:

```sh
npm version [major|minor|patch]
```

See [npm version docs](https://docs.npmjs.com/cli/commands/npm-version) for all available arguments.

Publish the new version with [vsce](https://github.com/microsoft/vscode-vsce):

```sh
npx @vscode/vsce@latest publish
```
