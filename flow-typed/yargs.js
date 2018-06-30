// @flow strict-local

declare module 'yargs' {
  declare type argv = {
    _: $ReadOnlyArray<string>,
    [key: string]: string,
  };

  declare type yargs = {
    argv: argv,
    version(): yargs,
    command(
      command: string,
      desc: string,
      options?: {},
      handler?: (argv: argv) => void | Promise<void>,
    ): yargs,
    option(name: string, options: {}): yargs,
    help(): yargs,
  };

  declare export default yargs;
}
