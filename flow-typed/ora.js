// @flow strict-local

declare module 'ora' {
  declare export default function ora(text: string): {
    start(): void,
    stop(): void,
  };
}
