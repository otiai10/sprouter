import { Component, ElementRef } from '@angular/core';
import Entry from 'src/app/models/entry';
import Job from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

declare var process: any;

declare interface ElectronFile extends File {
  path: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  outdir = process.env.HOME;
  isDraggedOver = false;
  isProcessing = false;
  result: {type?: string, message?: string} = null;

  constructor(private ref: ElementRef, private service: JobService) {}

  onDrop(ev: DragEvent) {
    ev.stopPropagation();
    ev.preventDefault();
    const entries = Array.from(ev.dataTransfer.files).map<Entry>((file: ElectronFile, index: number) => {
      return new Entry(index, file.path, file.name, file.size);
    });
    const job = new Job(entries, this.outdir);
    this.service.push(job);
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
    this.outdir = ev.target.files[0].path;
  }
}
