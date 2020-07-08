import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/shared/services/room.service';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  dataSource: any = [];
  isConfirmLoading = false;
  pageTitle = 'Danh sách phòng';
  constructor(
    public roomService: RoomService,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.isConfirmLoading = true;
    this.loadRoomList();
  }

  // get danh sach 
  public loadRoomList(): any {
    this.roomService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
       // console.log(this.dataSource);
      }
    });
  }

}
