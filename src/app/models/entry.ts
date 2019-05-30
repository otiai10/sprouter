export enum Status {
  READY = 'ready',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error',
}

declare interface ElectronFile extends File {
  path: string;
}

export default class Entry {
  public bpm?: number;
  constructor(
    public index: number,
    public path: string,
    public name: string,
    public size: number,
    public status: Status = Status.READY,
  ) {}
}

export function CreateEntriesFromDroppedFiles(files: FileList) {
    return Array.from(files).map<Entry>((file: ElectronFile, index: number) => {
      return new Entry(index, file.path, file.name, file.size);
    });
}
