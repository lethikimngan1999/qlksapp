import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  pageTitle = 'Chi tiết nhân viên';
  selectedEmployee: any = [];
  hasEmployee: any = false;
  constructor(
    public employeeService: EmployeeService,
    public activatedRoute: ActivatedRoute,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getEmployeeDetail(params.employeeId);
    });
  }
  private getEmployeeDetail(employeeId: string) {
    this.employeeService.getDetail(employeeId).subscribe(response => {
      if (response.Status === true) {
        this.selectedEmployee = response.Data;
        this.hasEmployee = true;
      }
      console.log(this.selectedEmployee);
    });
  }

  public editEmployee(data: any) {
    const modalEdit = this.modalService.create({
      nzTitle: 'Chỉnh sửa nhân viên',
      nzContent: EmployeeDialogComponent,
      nzComponentParams: {
        employeeDto: JSON.parse(JSON.stringify(data))
      }
    });
    // Return a result when closed
    modalEdit.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }
}
