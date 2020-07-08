import { Component, OnInit } from '@angular/core';
import { EmployeePositionService } from 'src/app/shared/services/employee-position.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { EmployeePositionDTO } from 'src/app/models';
import { EmployeepositionDialogComponent } from '../employeeposition-dialog/employeeposition-dialog.component';
import { TypeMessage } from 'src/app/app.constant';

@Component({
  selector: 'app-employeeposition-list',
  templateUrl: './employeeposition-list.component.html',
  styleUrls: ['./employeeposition-list.component.css']
})
export class EmployeepositionListComponent implements OnInit {

  dataSource: any = [];
  isConfirmLoading = false;
  pageTitle: string = "Danh sách chức vụ";
  constructor(
    public employeePositionService: EmployeePositionService,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.isConfirmLoading = true;
    this.loadEmployeePositionList();
  }

  // get danh sach chuc vu
  public loadEmployeePositionList(): any {
    this.employeePositionService.getAll().subscribe(response => {
      if(response && response.Status){
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
      }
    });
  }
  createEmployeePosition(): void {
    const modalCreate = this.modalService.create({
      nzTitle: 'Thêm nhân viên',
      nzContent: EmployeepositionDialogComponent,
      nzComponentParams: {
        isAdd: true,
        employeePositionDto: new EmployeePositionDTO()
      },
      nzWidth: '800',
    });
    // Return a result when closed
    modalCreate.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  editEmployeePosition(data: any) {
    const modalEdit = this.modalService.create({
      nzTitle: 'Chỉnh sửa chức vụ',
      nzContent: EmployeepositionDialogComponent,
      nzComponentParams: {
        employeePositionDto: JSON.parse(JSON.stringify(data))
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
      nzTitle: 'Bạn có chắc chắn xóa nhân viên có tên chức vụ là:',
      nzContent: `<b style='color: red;'> ${data.EmployeePositionName}?</b>`,
      nzOkText: 'Đồng ý',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteEmployeePosition(data.EmployeePositionId),
      nzCancelText: 'Hủy',
    });
  }

  // delete
  private deleteEmployeePosition(employeePositionId: any) {
    const param: any = { employeePositionId: employeePositionId };
    this.employeePositionService.delete(param).subscribe(response => {
      if (response.Status === true) {
        this.message.create(TypeMessage.Success, 'Xóa chức vụ thành công!');
        // get lai danh sach nhan vien
        this.loadEmployeePositionList();
      } else {
        this.message.create(TypeMessage.Error, 'Xóa chức vụ không thành công!');
      }
    });
  }

}
