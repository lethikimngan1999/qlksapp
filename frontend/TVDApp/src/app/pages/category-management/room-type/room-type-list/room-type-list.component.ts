import { Component, OnInit } from '@angular/core';
import { RoomTypeService } from 'src/app/shared/services/room-type.service';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-room-type-list',
  templateUrl: './room-type-list.component.html',
  styleUrls: ['./room-type-list.component.css']
})
export class RoomTypeListComponent implements OnInit {

  dataSource: any = [];
  isConfirmLoading = false;
  pageTitle: string = "Danh sách loại phòng";
  constructor(
    public roomTypeService: RoomTypeService ,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.isConfirmLoading = true;
    this.loadRoomTypeList();
  }

  // get danh sach
  public loadRoomTypeList(): any {
    this.roomTypeService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
      }
    });
  }

}
