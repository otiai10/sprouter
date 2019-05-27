import { Component, ElementRef } from '@angular/core';
import Entry, { CreateEntriesFromDroppedFiles } from 'src/app/models/entry';
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

  constructor(private ref: ElementRef, private service: JobService) {}

  onDrop(ev: DragEvent) {
    ev.stopPropagation();
    ev.preventDefault();
    const entries = CreateEntriesFromDroppedFiles(ev.dataTransfer.files);
    const job = new Job(entries, this.outdir);
    this.service.push(job);
  }

  onDirectoryChange(ev) {
    if (ev.target.files.length === 0) {
      return;
    }
    this.outdir = ev.target.files[0].path;
  }
}
