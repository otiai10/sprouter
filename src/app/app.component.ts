import { Component, OnInit, ElementRef } from '@angular/core';

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

  constructor(private ref: ElementRef) {}

  ngOnInit() {
    window.ipcRenderer.on('success', (ev, args) => {
      console.log('SUCCESS:', args);
      this.isProcessing = false;
    });
  }

  onDrop(ev: DragEvent) {
    ev.stopPropagation();
    ev.preventDefault();
    const file = ev.dataTransfer.files[0];
    if (!file) {
      return;
    }
    const { name, path, size, type } = file as any;
    window.ipcRenderer.send('file', { name, path, size, type, dest: this.destdir });
    this.isProcessing = true;
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
}
