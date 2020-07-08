import { Component, OnInit, Input } from '@angular/core';
import { UIColumn } from './models/uiColumn';

@Component({
  selector: 'app-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.css']
})
export class UITableComponent implements OnInit {

  // data
  @Input() uiData: [];

  // setting column
  @Input() uiColumns: UIColumn[];

  // page size
  @Input() uiPs: number;

  // page index
  @Input() uiPi: number;

  public header: [];

  constructor() { }

  ngOnInit(): void {
  }

}
