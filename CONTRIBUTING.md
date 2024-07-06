# Contributing

## Getting started

```sh
npm install
```

- Inside VS Code press `F5` to open a new window with the extension loaded.
- Set breakpoints in your code to debug the extension.
- Find output from the extension in the debug console.

## Make changes

- You can relaunch the extension from the debug toolbar after changing code.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with the extension to load your changes.

## Explore the VS Code API

- You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.

## Create a release

Bump the package version and generate a changelog:

```sh
npm version …
```

Publish the new version with [vsce](https://github.com/microsoft/vscode-vsce):

```sh
npx @vscode/vsce@latest publish
```

See [npm version docs](https://docs.npmjs.com/cli/commands/npm-version) for all available arguments.
