import { TestBed, async } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ConfigComponent } from './input/config.component';
import { DropComponent } from './input/drop.component';

describe('FormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigComponent,
        DropComponent,
        FormComponent,
      ],
    }).compileComponents();
  }));

  it('should create a component', () => {
    const component = TestBed.createComponent(FormComponent);
    expect(component).toBeTruthy();
  });

});
