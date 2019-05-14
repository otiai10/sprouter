import { Output, EventEmitter, Injectable } from '@angular/core';
import Job from '../models/job';

declare interface MessageChannel {
  send: (name: string, args: any) => void;
  on: (name: string, listener: (event: Event, args: any) => void) => void;
}

declare var window: {
  ipcRenderer: MessageChannel;
};

@Injectable({
  providedIn: 'root',
})
export class JobService {

  @Output() public updated: EventEmitter<Job> = new EventEmitter();

  public job: Job;
  private ipc: MessageChannel;

  constructor() {
    this.ipc = window.ipcRenderer;
    this.ipc.on('job-update', (ev, args) => this.onUpdate(ev, args));
  }

  push(job: Job) {
    this.ipc.send('job-start', job);
    this.updated.emit(job);
  }

  private onUpdate(ev, args) {
    console.log('Service.onUpdate', args, Job.decode(args));
    this.updated.emit(Job.decode(args));
  }
}
