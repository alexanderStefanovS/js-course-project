import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqlConnectionFormComponent } from './mysql-connection-form.component';

describe('MysqlConnectionFormComponent', () => {
  let component: MysqlConnectionFormComponent;
  let fixture: ComponentFixture<MysqlConnectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MysqlConnectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MysqlConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
