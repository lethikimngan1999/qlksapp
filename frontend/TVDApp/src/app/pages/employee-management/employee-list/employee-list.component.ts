import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { EmployeeDTO } from 'src/app/models';
import { TypeMessage } from 'src/app/app.constant';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dataSource: any = [];
  isConfirmLoading = false;
  pageTitle = 'Danh sách nhân viên';
  constructor(
    public employeeService: EmployeeService,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.isConfirmLoading = true;
    this.loadEmployeeList();
  }

  // get danh sach nhan vien
  public loadEmployeeList(): any {
    this.employeeService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
       // console.log(this.dataSource);
      }
    });
  }

  createEmployee(): void {
    const modalCreate = this.modalService.create({
      nzTitle: 'Thêm nhân viên',
      nzContent: EmployeeDialogComponent,
      nzComponentParams: {
        isAdd: true,
        employeeDto: new EmployeeDTO()
      },
      nzWidth: '800',
    });
    // Return a result when closed
    modalCreate.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  editEmployee(data: any) {
    const modalEdit = this.modalService.create({
      nzTitle: 'Chỉnh sửa nhân viên',
      nzContent: EmployeeDialogComponent,
      nzComponentParams: {
        employeeDto: JSON.parse(JSON.stringify(data))
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
      nzTitle: 'Bạn có chắc chắn xóa nhân viên có họ và tên:',
      nzContent: `<b style='color: red;'> ${data.LastName} ${data.FirstName}?</b>`,
      nzOkText: 'Đồng ý',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteEmployee(data.EmployeeId),
      nzCancelText: 'Hủy',
    });
  }

  /**
 * delete data
 */
  private deleteEmployee(employeeId: any) {
    const param: any = { employeeId };
    this.employeeService.delete(param).subscribe(response => {
      if (response.Status === true) {
        this.message.create(TypeMessage.Success, 'Xóa nhân viên thành công!');
        // get lai danh sach nhan vien
        this.loadEmployeeList();
      } else {
        this.message.create(TypeMessage.Error, 'Xóa nhân viên không thành công!');
      }
    });
  }

  // xem chi tiết nhân viên
  public viewEmployee(employeeId: any) {
    this.navigateEmployeeDetail(employeeId);
  }

  private navigateEmployeeDetail(employeeId: any) {
    if (employeeId) {
      // chuyen sang màn hình chi tiết nhan vien
      this.router.navigate(['employee-management/detail/'], { queryParams: { employeeId } });
    } else {
      this.message.create(TypeMessage.Error, 'Có lỗi xảy ra!');
    }
  }

}



