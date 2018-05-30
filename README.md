# flow-checker

[![npm](https://img.shields.io/npm/v/flow-checker.svg)](https://www.npmjs.com/package/flow-checker) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![npm](https://img.shields.io/npm/l/flow-checker.svg) ![David](https://img.shields.io/david/HenriBeck/flow-checker.svg) [![CircleCI](https://circleci.com/gh/HenriBeck/flow-checker.svg?style=svg)](https://circleci.com/gh/HenriBeck/flow-checker)

A better flow cli with ignoring errors from files which are in `node_modules` folder.

## Installation

> yarn install --dev flow-checker flow-bin

## Usage

In your scripts, run flow-check to validate all of your files with without reporting errors for files inside `node_modules`.
But you don't loose any typing definitions by needing to ignore certain files inside `node_modules`.

```json
{
  "scripts": { "flow": "flow-check" }
}
```

## ToDos

- Implement configuration of ignored files
- Add a way of passing flags down to flow
- Add tests for each flow version

## License

MIT
