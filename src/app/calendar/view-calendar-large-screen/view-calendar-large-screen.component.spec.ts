import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalendarLargeScreenComponent } from './view-calendar-large-screen.component';

describe('ViewCalendarLargeScreenComponent', () => {
  let component: ViewCalendarLargeScreenComponent;
  let fixture: ComponentFixture<ViewCalendarLargeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCalendarLargeScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCalendarLargeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
