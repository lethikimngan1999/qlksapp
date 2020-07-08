import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { CustomerDTO } from 'src/app/models/CustomerDTO';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  dataSource: any = [];
  isConfirmLoading = false;
   pageTitle: string = "Danh sách khách hàng";

  constructor(
    public customerService: CustomerService,
    public router: Router,
    private modalService: NzModalService,
    private message: NzMessageService

  ) { }

  ngOnInit(): void {
    this.isConfirmLoading = true;
    this.loadCustomerList();
  }
  // get list
  public loadCustomerList(): any {
    this.customerService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
      }
    });
  }

  createCustomer(): void {
    const modalCreate = this.modalService.create({
      nzTitle: 'Thêm khách hàng',
      nzContent: CustomerDialogComponent,
      nzComponentParams: {
        isAdd: true,
        customerDto: new CustomerDTO()
      },
      nzWidth: '800',
    });
    // Return a result when closed
    modalCreate.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  editCustomer(data: any) {
    const modalEdit = this.modalService.create({
      nzTitle: 'Chỉnh sửa khách hàng',
      nzContent: CustomerDialogComponent,
      nzComponentParams: {
        customerDto: JSON.parse(JSON.stringify(data))
      },
      nzWidth: '800',
    });
    // Return a result when closed
    modalEdit.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }
}
