import { TestBed, async } from '@angular/core/testing';
import { EntriesComponent } from './entries.component';

describe('EntriesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EntriesComponent,
      ],
    }).compileComponents();
  }));

  it('should create a component', () => {
    const component = TestBed.createComponent(EntriesComponent);
    expect(component).toBeTruthy();
  });

});
