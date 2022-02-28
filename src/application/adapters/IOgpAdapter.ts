export abstract class IOgpAdapter {
  abstract fetch(url: string): Promise<{ [key: string]: string }>;
}
