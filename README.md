# check-flow

[![npm](https://img.shields.io/npm/v/check-flow.svg)](https://www.npmjs.com/package/check-flow) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![npm](https://img.shields.io/npm/l/check-flow.svg) ![David](https://img.shields.io/david/HenriBeck/check-flow.svg) [![CircleCI](https://circleci.com/gh/HenriBeck/check-flow.svg?style=svg)](https://circleci.com/gh/HenriBeck/check-flow) [![Maintainability](https://api.codeclimate.com/v1/badges/0ddecaa2ad0f3faf830e/maintainability)](https://codeclimate.com/github/HenriBeck/check-flow/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0ddecaa2ad0f3faf830e/test_coverage)](https://codeclimate.com/github/HenriBeck/check-flow/test_coverage) [![CodeFactor](https://www.codefactor.io/repository/github/henribeck/check-flow/badge)](https://www.codefactor.io/repository/github/henribeck/check-flow)

A better flow cli with ignoring errors from files which are in `node_modules` folder and only showing errors from certain files.

Supports flow >= 0.65.0

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

## Including files

The main argument to the command are globs which should only report errors for.
This can be useful to only get errors from a specific directory or for something like [https://github.com/okonet/lint-staged](lint-staged).
Multiple globs can be specified.

Example: Only show errors for files inside the src directory and which have the js extension.

````json
{
  "scripts": {
    "flow": "check-flow \"src/**/*.js\" \"src/*.js\""
  }
}
````

## Ingoring files

Ignoring files is configured by a `.flowignore` inside the current working directory.

Example:
```.git exclude
# This is a comment
node_modules
dist
```

## Development

### Installing dependencies

> yarn

### Linting & flow

> yarn lint

and

> yarn flow

Notice: When running flow, this package uses actually this package and compiles the code before to run it.

Before commit, it will also run lint and flow to check for errors.

### Testing

> yarn test

This will run the tests for every supported flow versions.
Don't worry when they take some time because we run 3 tests per supported flow version.

### Building

> yarn build

This will compile the source code which is located in `src/` and output it into `bin/`.

## License

MIT
