import Entry, { Status } from './entry';

export default class Job {
  public static decode(jsonlike: any): Job {
    return new Job(
      jsonlike.entries.map(e => {
        const entry = new Entry(e.index, e.path, e.name, e.size, e.status);
        if (e.bpm) { entry.bpm = e.bpm; }
        return entry;
      }),
      jsonlike.outdir,
    );
  }
  constructor(public entries: Entry[], public outdir: string) {}
  get length(): number {
    return this.entries.length;
  }
  get progress(): number {
    return this.entries.filter(e => [Status.DONE, Status.ERROR].includes(e.status)).length;
  }
  get finished(): boolean {
    return ! this.entries.some(e => [Status.READY, Status.PROCESSING].includes(e.status));
  }
}
