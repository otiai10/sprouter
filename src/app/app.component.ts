import { Component, OnInit } from '@angular/core';

declare var window: {
  ipcRenderer: {
    send: (name: string, args: any) => void;
    on: (name: string, listener: (event: Event, args: any) => void) => void;
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isDraggedOver = false;
  isProcessing = false;

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
    window.ipcRenderer.send('file', { name, path, size, type });
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

}
