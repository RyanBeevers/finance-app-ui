import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeeklySummaryComponent } from './calendar-weekly-summary.component';

describe('CalendarWeeklySummaryComponent', () => {
  let component: CalendarWeeklySummaryComponent;
  let fixture: ComponentFixture<CalendarWeeklySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWeeklySummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarWeeklySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
