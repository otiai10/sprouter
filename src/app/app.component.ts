import { Component, OnInit, ElementRef, NgZone } from '@angular/core';

declare var window: {
  ipcRenderer: {
    send: (name: string, args: any) => void;
    on: (name: string, listener: (event: Event, args: any) => void) => void;
  }
};

declare var process: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  destdir = (() => process.env.HOME)();
  isDraggedOver = false;
  isProcessing = false;
  result: {type?: string, message?: string} = null;

  constructor(private ref: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    window.ipcRenderer.on('success', (ev, args) => this.onResult({...args, type: 'success'}));
    window.ipcRenderer.on('error', (ev, args) => this.onResult({...args, type: 'error'}));
  }

  onDrop(ev: DragEvent) {
    ev.stopPropagation();
    ev.preventDefault();
    console.log(ev.dataTransfer);
    // const file = ev.dataTransfer.files[0];
    console.log(ev.dataTransfer.files);
    // if (!file) {
    //   return;
    // }
    // this.startProcessing();
    // setTimeout(() => {
    //   const { name, path, size, type } = file as any;
    //   window.ipcRenderer.send('file', { name, path, size, type, dest: this.destdir });
    // });
  }

  onDragOver(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.isDraggedOver = true;
  }

  onDragLeave(ev) {
    this.isDraggedOver = false;
  }

  startDirectorySelect() {
    this.ref.nativeElement.querySelector('input[type=file]').click();
  }

  onDirectoryChange(ev) {
    if (ev.target.files.length === 0) {
      return;
    }
    this.destdir = ev.target.files[0].path;
  }

  private startProcessing() {
    this.result = null;
    this.isProcessing = true;
  }
  private onResult(result) {
    this.zone.run(() => {
      this.isProcessing = false;
      this.result = result;
    });
  }
}
