import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGenerationComponent } from './custom-generation.component';

describe('CustomGenerationComponent', () => {
  let component: CustomGenerationComponent;
  let fixture: ComponentFixture<CustomGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
