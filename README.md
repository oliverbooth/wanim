# wanim

> A web-first library for creating mathematical animations.

This is an [nx] monorepo, containing the core, examples and docs of wanim.

## Installation

TODO: Link to docs

## Developing

After cloning the repository install dependancies ...

```console
npm install
```

... you can start working on the core, examples or the docs. If you are using VSCode, we recommend using the [Nx Console extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) to manage your activity in the monorepo.

You can execute package scripts for the individual projects (`wanim`, `examples`, `docs`) by running:

```console
npx nx run [project]:[script]
```

### Core

This is a [TypeScript] project that is targeted at the web.

```console
npx nx run wanim:build   # build the project
npx nx run wanim:test    # run test
```

### Docs

This is a [Starlight] project.

```console
npx nx run docs:dev     # start a docs dev server
npx nx run docs:build   # builds the docs
```

### Examples

This is a [React] project powered by [Vite].

```console
npx nx run examples:dev   # starts an examples dev server
```

[nx]: https://nx.dev/
[Starlight]: https://starlight.astro.build/
[React]: https://react.dev/
[Vite]: https://vite.dev/
[TypeScript]: https://www.typescriptlang.org/
