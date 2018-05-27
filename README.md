# flow-checker
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
