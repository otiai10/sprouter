import { TestBed, async } from '@angular/core/testing';
import { DropComponent } from './drop.component';

describe('DropComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropComponent,
      ],
    }).compileComponents();
  }));

  it('should create a component', () => {
    const component = TestBed.createComponent(DropComponent);
    expect(component).toBeTruthy();
  });

});
