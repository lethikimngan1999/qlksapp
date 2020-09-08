import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/shared/services/room.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.css']
})
export class RoomStatusComponent implements OnInit {

  // cards = [
  //   {
  //     title: 'Phòng 101',
  //     description: '1',


  //   },
  //   {
  //     title: 'Phòng 102',
  //     description: '0',


  //   },
  //   {
  //     title: 'Phòng 103',
  //     description: '1',

  //   },
  //   {
  //     title: 'Phòng 104',
  //     description: '0',

  //   },
  //   {
  //     title: 'Phòng 105',
  //     description: '1',

  //   },
  //   {
  //     title: 'Phòng 106',
  //     description: '1',

  //   },
  //   {
  //     title: 'Phòng 107',
  //     description: '0',

  //   },
  //   {
  //     title: 'Phòng 108',
  //     description: '1',

  //   },
  //   {
  //     title: 'Phòng 109',
  //     description: '0',

  //   },
  // ];
  dataSource: any = [];
  @Input() isAdd: boolean;
  @Input() status: boolean;
 // public isConfirmLoading = false;

  ngOnInit(): void {
    // if (!this.isConfirmLoading) {
    //   this.isAdd = true;
    // }
    this.loadRoomList();
  }

  constructor(
    public roomService: RoomService,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }



  // get danh sach 
  public loadRoomList(): any {
    this.roomService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        //this.isConfirmLoading = false;
       // console.log(this.dataSource);
      }
    });
  }

}

