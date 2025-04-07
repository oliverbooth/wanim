# wanim

> A web-first library for creating mathematical animations.

This is an monorepo using [yarn workspaces](), containing the core, examples and docs of **wanim**.

## Installation

TODO: Link to docs

## Developing

After cloning the repository install dependancies ...

```console
yarn
```

... you can start working on the core, examples or the docs.

You can execute package scripts for the individual projects (`wanim`, `examples`, `docs`) by running:

```console
yarn workspace <project> <script>
```

### Core

This is a [TypeScript] project that is targeted at the web.

```console
yarn workspace wanim build   # build the project
yarn workspace wanim test    # run test
```

### Docs

This is a [Starlight] project.

```console
yarn workspace docs dev     # start a docs dev server
yarn workspace docs build   # builds the docs
```

### Examples

This is a [React] project powered by [Vite].

```console
yarn workspace examples dev  # starts an examples dev server
```

[nx]: https://nx.dev/
[Starlight]: https://starlight.astro.build/
[React]: https://react.dev/
[Vite]: https://vite.dev/
[TypeScript]: https://www.typescriptlang.org/
