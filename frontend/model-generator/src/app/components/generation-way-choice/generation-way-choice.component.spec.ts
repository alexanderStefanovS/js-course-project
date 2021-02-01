import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationWayChoiceComponent } from './generation-way-choice.component';

describe('GenerationWayChoiceComponent', () => {
  let component: GenerationWayChoiceComponent;
  let fixture: ComponentFixture<GenerationWayChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationWayChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationWayChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
