import { Component, OnInit, Input } from '@angular/core';
import { CustomerDTO } from 'src/app/models/CustomerDTO';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { TypeMessage } from 'src/app/app.constant';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  isConfirmLoading = false;
  isShowAdd = false;
  isSaveLoading = false;

  @Input() isAdd: boolean;
  @Input() customerDto: CustomerDTO;

  dateFormat = 'dd/MM/yyyy';
  validateForm: FormGroup;
  selectedCustomer: any = [];
  loading = false;
  selectedValue = null;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
  ) {
  }


  ngOnInit(): void {
    this.initFormValidate();
  }


  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      // tslint:disable-next-line: max-line-length
      _ipText_identityCardNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)],[this.userNameAsyncValidator]],
      _ipText_firstName: ['', Validators.required],
      _ipText_lastName: ['', Validators.required],
      _ipDate_dateOfBirth: [null, Validators.required],
      _rdo_gender: ['False', Validators.required],
      _ipText_nationality: [null, Validators.required],
      _ipText_phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
    });
  }
  
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.customerService.getByIdentityCardNumber(control.value).subscribe(response => {
          if (response.Status && response.Data) {
            this.selectedCustomer = response.Data;
            // tslint:disable-next-line: triple-equals
            if (this.selectedCustomer.CustomerId != this.customerDto.CustomerId) {
              observer.next({ error: true, duplicated: true });
            } else {
              observer.next(null);
            }
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      }, 1000);
    })
  public handleCancelButton(): void {
    this.resetForm();
    this.modal.destroy();
  }

  public handleSubmitButton(): void {
    this.isSaveLoading = true;
    this.saveData();
    setTimeout(() => {
      this.isSaveLoading = false;
    }, 1000);
    this.modal.destroy();
  }

  private saveData() {
    this.isConfirmLoading = true;
    if (!this.customerDto || this.isAdd) {
      this.insertCustomer();
    } else {
      this.updateCustomer();
    }
    console.log(this.customerDto);
  }

  // tao nhan vien moi
  private insertCustomer(): void {

    if (this.customerDto) {
      this.customerService.create(this.customerDto).subscribe(response => {

        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Thêm khách hàng thành công!'
          );
        } else {
          this.message.create(TypeMessage.Error, 'Thêm khách hàng không thành công!'
          );
        }
        this.isConfirmLoading = false;
        this.resetForm();
      });
    }
  }

  private updateCustomer() {
    if (this.customerDto) {
      this.customerService.update(this.customerDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Cập nhật khách hàng thành công!'
          );
          console.log(this.customerDto);
        } else {
          this.message.create(TypeMessage.Error, 'Cập nhật khách hàng không thành công!'
          );
        }
        this.isConfirmLoading = false;
      });
    }
  }


  resetForm(): void {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }


}
