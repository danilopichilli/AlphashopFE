import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewartComponent } from './newart.component';

describe('NewartComponent', () => {
  let component: NewartComponent;
  let fixture: ComponentFixture<NewartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewartComponent]
    });
    fixture = TestBed.createComponent(NewartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
