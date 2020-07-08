import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-exception',
  templateUrl: './template-exception.component.html',
  styleUrls: ['./template-exception.component.css']
})
export class TemplateExceptionComponent implements OnInit {

  constructor() { }
  @Input() type: string;
  ngOnInit(): void {
  }

}
