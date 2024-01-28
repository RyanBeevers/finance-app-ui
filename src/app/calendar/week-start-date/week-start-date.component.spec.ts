import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekStartDateComponent } from './week-start-date.component';

describe('WeekStartDateComponent', () => {
  let component: WeekStartDateComponent;
  let fixture: ComponentFixture<WeekStartDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekStartDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeekStartDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
