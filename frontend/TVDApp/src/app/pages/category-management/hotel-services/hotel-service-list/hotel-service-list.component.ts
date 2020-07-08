import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from 'src/app/shared/services/hotel-service.service';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TypeMessage } from 'src/app/app.constant';
import { HotelServiceDialogComponent } from '../hotel-service-dialog/hotel-service-dialog.component';
import { HotelServiceDTO } from 'src/app/models/HotelServiceDTO';

@Component({
  selector: 'app-hotel-service-list',
  templateUrl: './hotel-service-list.component.html',
  styleUrls: ['./hotel-service-list.component.css']
})
export class HotelServiceListComponent implements OnInit {

  dataSource: any = [];
  isConfirmLoading = false;
  pageTitle: string = "Danh sách dịch vụ";
  constructor(
    public hotelServiceService: HotelServiceService ,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.isConfirmLoading = true;
    this.loadHotelServiceList();
  }

  // get danh sach
  public loadHotelServiceList(): any {
    this.hotelServiceService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
      }
    });
  }

  
  create(): void {
    const modalCreate = this.modalService.create({
      nzTitle: 'Thêm dịch vụ',
      nzContent: HotelServiceDialogComponent,
      nzComponentParams: {
        isAdd: true,
        hotelServiceDto: new HotelServiceDTO()
      },
      nzWidth: '800',
    });
    // Return a result when closed
    modalCreate.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  edit(data: any) {
    const modalEdit = this.modalService.create({
      nzTitle: 'Chỉnh sửa dịch vụ',
      nzContent: HotelServiceDialogComponent,
      nzComponentParams: {
        hotelServiceDto: JSON.parse(JSON.stringify(data))
      },
      nzWidth: '800',
    });
    // Return a result when closed
    modalEdit.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }


  public confirmDelete(data: any) {
    const modalDelete = this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn xóa dịch vụ có tên là:',
      nzContent: `<b style='color: red;'> ${data.HotelServiceName}?</b>`,
      nzOkText: 'Đồng ý',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data.HotelServiceId),
      nzCancelText: 'Hủy',
    });
  }
  // delete
  private delete(hotelServiceId: any) {
    const param: any = { hotelServiceId: hotelServiceId };
    this.hotelServiceService.delete(param).subscribe(response => {
      if (response.Status === true) {
        this.message.create(TypeMessage.Success, 'Xóa dịch vụ thành công!');
        // get lai danh sach
        this.loadHotelServiceList();
      } else {
        this.message.create(TypeMessage.Error, 'Xóa dịch vụ không thành công!');
      }
    });
  }
}
