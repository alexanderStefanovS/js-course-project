import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbMetadataComponent } from './db-metadata.component';

describe('DbMetadataComponent', () => {
  let component: DbMetadataComponent;
  let fixture: ComponentFixture<DbMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbMetadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
