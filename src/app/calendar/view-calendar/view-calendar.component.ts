import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrl: './view-calendar.component.scss'
})
export class ViewCalendarComponent implements OnInit {

  isLargeScreen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      this.isLargeScreen = result.matches;
    });
    setTimeout(()=>{
      window.scrollTo(0,0);
    })
  }

}
