# WebC for VS Code

Please refer to the [WebC documentation](https://www.11ty.dev/docs/languages/webc/) for how to use WebC in general or in your [Eleventy](https://www.11ty.dev/) project in particular.

## Features

- [Autocomplete](#autocomplete)
- [Documentation](#documentation)
- [Definitions](#definitions)

## Autocomplete

Provides `webc:` and `@` attribute autocomplete suggestions for HTML tags.

<img src="images/attribute-autocomplete-webc.webp" alt="List of autocomplete suggestions for WebC attributes." width="396">

<img src="images/attribute-autocomplete-at.webp" alt="List of autocomplete suggestions for WebC @ attributes." width="378">

## Documentation

`webc:` and `@` attributes show a link to the WebC documentation on hover.

<img src="images/documentation-links.webp" alt="Hover tooltip on a webc:for attribute showing a link to the WebC documentation." width="345">

## Definitions

Support for _Go to Definition_ and _Peek Definition_ ([VS Code _Peek_ documentation](https://code.visualstudio.com/docs/editor/editingevolved#_peek)) and <kbd>Ctrl</kbd> + Click on WebC component tags to go the source file.

<img src="images/peek-definition.webp" alt="Peek definition disclosure box for a WebC component." width="748">
