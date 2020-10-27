import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacktypeAddComponent } from './packtype-add.component';

describe('PacktypeAddComponent', () => {
  let component: PacktypeAddComponent;
  let fixture: ComponentFixture<PacktypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacktypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacktypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
