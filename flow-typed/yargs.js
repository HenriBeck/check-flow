declare module 'yargs' {
  declare type yargs = {
    argv: {
      _: $ReadOnlyArray<string>,
      [key: string]: string,
    },
    option(name: string, options: {}): yargs,
  };

  declare export default yargs;
}
