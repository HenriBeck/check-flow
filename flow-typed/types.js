declare module 'flow-bin' {
  declare export default string;
}

declare module 'ora' {
  declare export default function ora(text: string): {
    start(): void,
    stop(): void;
  };
}
