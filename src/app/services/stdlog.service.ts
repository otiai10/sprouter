import { Output, EventEmitter, Injectable } from '@angular/core';
import { Payload } from '../models/stdio';

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
export class StdlogService {

  @Output() public updated: EventEmitter<Payload> = new EventEmitter();

  private ipc: MessageChannel;

  constructor() {
    this.ipc = window.ipcRenderer;
    this.ipc.on('stdio-log', (ev, args) => this.onUpdate(ev, args));
  }

  private onUpdate(ev, payload: Payload) {
    this.updated.emit(payload);
  }
}
