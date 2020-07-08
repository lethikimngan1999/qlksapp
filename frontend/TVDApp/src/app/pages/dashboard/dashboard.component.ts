import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }


  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
