# check-flow

[![npm](https://img.shields.io/npm/v/check-flow.svg)](https://www.npmjs.com/package/check-flow) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![npm](https://img.shields.io/npm/l/check-flow.svg) ![David](https://img.shields.io/david/HenriBeck/check-flow.svg) [![CircleCI](https://circleci.com/gh/HenriBeck/check-flow.svg?style=svg)](https://circleci.com/gh/HenriBeck/check-flow) [![Maintainability](https://api.codeclimate.com/v1/badges/0ddecaa2ad0f3faf830e/maintainability)](https://codeclimate.com/github/HenriBeck/check-flow/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0ddecaa2ad0f3faf830e/test_coverage)](https://codeclimate.com/github/HenriBeck/check-flow/test_coverage)

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

## Ingoring files

Ignoring files is configured by a `.flowignore` inside the current working directory.
It supports the same syntax as the `.gitignore`.

## Including files

The main argument to the command are globs which should only report errors for.
This can be useful to only get errors from a specific directory or for something like [https://github.com/okonet/lint-staged](lint-staged).
Multiple globs can be specified.

## License

MIT
