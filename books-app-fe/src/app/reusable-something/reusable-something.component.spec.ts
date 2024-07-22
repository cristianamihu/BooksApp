import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableSomethingComponent } from './reusable-something.component';

describe('ReusableSomethingComponent', () => {
  let component: ReusableSomethingComponent;
  let fixture: ComponentFixture<ReusableSomethingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableSomethingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableSomethingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
