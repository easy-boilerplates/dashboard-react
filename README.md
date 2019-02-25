# Easy React Dashboard

Template with functional and examples for create Dashboard on React

## About

- Сomfortable Folder structure
- Localization (in json - src/locales) - React Intl
- Typings, Linting, Beautify - Typescript, TSLint, Prettier
- Bundling, transpiled and minifying next JS and CSS to old browsers - Webpack, Babel
- State Management without pain) - Redux + Redux-Handler
- Ready to use UI Components - Ant-Design
- Light and Dark theme
- CSSModules + PostCSS (https://preset-env.cssdb.org/features):
  - Custom Properties
  - Nesting
  - Mixins
  - Imports
  - Inline SVG and SVG optimization
- Handled requests
- Examples of use configs (./configs)

## Requirements

NodeJS 10^

## Install all depencies

```bash
npm i
```

## Development

```bash
npm run dev
```

## Production static (copy all files from ./dist to server)

```bash
npm run build
```

## Production with server (Start application on node server)

```bash
npm run build:full
npm run start
```
