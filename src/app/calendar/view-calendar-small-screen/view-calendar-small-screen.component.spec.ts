import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalendarSmallScreenComponent } from './view-calendar-small-screen.component';

describe('ViewCalendarSmallScreenComponent', () => {
  let component: ViewCalendarSmallScreenComponent;
  let fixture: ComponentFixture<ViewCalendarSmallScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCalendarSmallScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCalendarSmallScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
