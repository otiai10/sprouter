export enum Status {
  READY = 'ready',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error',
}

export default class Entry {
  constructor(
    public index: number,
    public path: string,
    public name: string,
    public size: number,
    public status: Status = Status.READY,
  ) {}
}
