import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { StdlogService } from 'src/app/services/stdlog.service';
import { Payload } from 'src/app/models/stdio';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.scss']
})
export class InspectComponent {
  @ViewChild('logview') private logview: ElementRef;
  private payloads: Payload[] = [];
  constructor(private service: StdlogService, private zone: NgZone) {
    this.service.updated.subscribe((payload: Payload) => {
      this.zone.run(() => {
        this.payloads = [...this.payloads, payload];
        this.scroll();
      });
    });
  }
  private scroll() {
    this.logview.nativeElement.scrollTop = this.logview.nativeElement.scrollHeight;
  }
}
