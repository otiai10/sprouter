import { TestBed, async } from '@angular/core/testing';
import { ConfigComponent } from './config.component';

describe('ConfigComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfigComponent,
      ],
    }).compileComponents();
  }));

  it('should create a component', () => {
    const component = TestBed.createComponent(ConfigComponent);
    expect(component).toBeTruthy();
  });

});
