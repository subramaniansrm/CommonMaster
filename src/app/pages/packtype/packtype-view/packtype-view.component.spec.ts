import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacktypeViewComponent } from './packtype-view.component';

describe('PacktypeViewComponent', () => {
  let component: PacktypeViewComponent;
  let fixture: ComponentFixture<PacktypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacktypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacktypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
