import { Component, Input } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {

  @Input() onDrop: (ev: DragEvent) => void;
  isDraggedOver = false;

  constructor(private service: JobService) {}

  onDragOver(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.isDraggedOver = true;
  }

  onDragLeave(ev) {
    this.isDraggedOver = false;
  }
}
