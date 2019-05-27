import { Component, Input } from '@angular/core';

declare var process: any;

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent {

  @Input() onDrop: (ev: DragEvent) => void;
  isDraggedOver = false;

  constructor() {}

  onDragOver(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.isDraggedOver = true;
  }

  onDragLeave(ev) {
    this.isDraggedOver = false;
  }
}
