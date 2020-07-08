import { Component, OnInit, Input } from '@angular/core';
import { TypeMessage } from 'src/app/app.constant';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tinhtrang-list',
  templateUrl: './tinhtrang-list.component.html',
  styleUrls: ['./tinhtrang-list.component.css']
})
export class TinhtrangListComponent implements OnInit {
  cards = [
    {
      title: 'Phòng 101',
      description: '1',


    },
    {
      title: 'Phòng 102',
      description: '0',


    },
    {
      title: 'Phòng 103',
      description: '1',

    },
    {
      title: 'Phòng 104',
      description: '0',

    },
    {
      title: 'Phòng 105',
      description: '1',

    },
    {
      title: 'Phòng 106',
      description: '1',

    },
    {
      title: 'Phòng 107',
      description: '0',

    },
    {
      title: 'Phòng 108',
      description: '1',

    },
    {
      title: 'Phòng 109',
      description: '0',

    },
  ];

  @Input() isAdd: boolean;
  @Input() status: boolean;
  public isConfirmLoading = false;
  constructor(private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.isConfirmLoading) {
      this.isAdd = true;
    }
  }
}


