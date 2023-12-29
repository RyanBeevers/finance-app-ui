import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalednarComponent } from './view-calednar.component';

describe('ViewCalednarComponent', () => {
  let component: ViewCalednarComponent;
  let fixture: ComponentFixture<ViewCalednarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCalednarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCalednarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
