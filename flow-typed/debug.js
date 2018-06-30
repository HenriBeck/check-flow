// @flow strict-local

declare module 'debug' {
  declare function log(msg: string, ...data: $ReadOnlyArray<mixed>): void;

  declare export default function debug(module: string): log;
}
