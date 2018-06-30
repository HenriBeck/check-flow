// @flow strict-local

declare module 'ignore' {
  declare export class Ignore {
    add(path: string): this,
    add(path: $ReadOnlyArray<string>): this,
    ignores(path: string): boolean,
  }

  declare export default function ignore(): Ignore;
}
