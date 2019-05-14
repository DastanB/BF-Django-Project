import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyregisterComponent } from './myregister.component';

describe('MyregisterComponent', () => {
  let component: MyregisterComponent;
  let fixture: ComponentFixture<MyregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
