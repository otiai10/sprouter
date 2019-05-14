import { TestBed, async } from '@angular/core/testing';
import { FormComponent } from './form.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
      ],
    }).compileComponents();
  }));

  it('should create a component', () => {
    const component = TestBed.createComponent(FormComponent);
    expect(component).toBeTruthy();
  });

});
