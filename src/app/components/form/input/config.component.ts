import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  @Input() onDirectoryChange: (ev: Event) => void;
  @Input() outdir: string;
  constructor(private ref: ElementRef) {}

  startDirectorySelect() {
    this.ref.nativeElement.querySelector('input[type=file]').click();
  }

}
