import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbConnctionComponent } from './db-connction.component';

describe('DbConnctionComponent', () => {
  let component: DbConnctionComponent;
  let fixture: ComponentFixture<DbConnctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbConnctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbConnctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
