import { Output, EventEmitter, Injectable } from '@angular/core';
import Job from '../models/job';

declare interface MessageChannel {
  send: (name: string, args: any) => void;
  on: (name: string, listener: (event: Event, args: any) => void) => void;
}

declare var window: {
  ipcRenderer: MessageChannel;
};
declare var process: any;

@Injectable({
  providedIn: 'root',
})
export class JobService {

  @Output() public updated: EventEmitter<Job> = new EventEmitter();

  public job: Job = new Job([], process.env.HOME);
  private ipc: MessageChannel;

  constructor() {
    this.ipc = window.ipcRenderer;
    this.ipc.on('job-update', (ev, args) => this.onUpdate(ev, args));
  }

  push(job: Job) {
    this.job = job;
    this.ipc.send('job-start', job);
    this.updated.emit(job);
  }

  private onUpdate(ev, args) {
    this.job = Job.decode(args);
    console.log('Service.onUpdate', this.job);
    this.updated.emit(this.job);
  }
}
