import { TestBed, async } from '@angular/core/testing';
import { InspectComponent } from './inspect.component';

describe('InspectComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InspectComponent,
      ],
    }).compileComponents();
  }));

  it('should create a component', () => {
    const component = TestBed.createComponent(InspectComponent);
    expect(component).toBeTruthy();
  });

});
