import { Component, NgZone } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import Job from 'src/app/models/job';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent {
  private job: Job;
  constructor(private service: JobService, private zone: NgZone) {
    this.service.updated.subscribe(job => {
      this.zone.run(() => this.job = job);
    });
  }
}
