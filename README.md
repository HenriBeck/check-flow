# check-flow

[![npm](https://img.shields.io/npm/v/check-flow.svg)](https://www.npmjs.com/package/check-flow) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![npm](https://img.shields.io/npm/l/check-flow.svg) ![David](https://img.shields.io/david/HenriBeck/check-flow.svg) [![CircleCI](https://circleci.com/gh/HenriBeck/check-flow.svg?style=svg)](https://circleci.com/gh/HenriBeck/check-flow)

A better flow cli with ignoring errors from files which are in `node_modules` folder.

## Installation

> yarn install --dev check-flow flow-bin

## Usage

In your scripts, run flow-check to validate all of your files with without reporting errors for files inside `node_modules`.
But you don't loose any typing definitions by needing to ignore certain files inside `node_modules`.

```json
{
  "scripts": { "flow": "check-flow" }
}
```

Any arguments except the `ignore` option will be passed down to `flow check`.

## Options

#### ignore

This way you can configure from which files the errors to be ignored.
This can be a string with multiple globs seperated by an comma.

> Alias: i
> Default value: node_modules/**/*

## License

MIT
