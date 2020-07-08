import { Component, OnInit, Input } from '@angular/core';
import { UserDTO } from 'src/app/models/UserDTO';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Observable, Observer, observable } from 'rxjs';
import { TypeMessage } from 'src/app/app.constant';
import { RoleDTO } from 'src/app/models/RoleDTO';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  isConfirmLoading = false;
  isShowAdduser = false;
  isSaveLoading = false;
  hasEmployeeNotAccount = false;

  listUser: UserDTO[] = [];
  listRole: RoleDTO[] = [];
  modelRoleModal: any = [];

  @Input() isAdd: boolean;
  @Input() userDto: UserDTO;
  @Input() isShowAddRole: boolean;
  @Input() listRoles: any;


  resetPassword = false;
  validateForm: FormGroup;
  loading = false;
  avatarUrl: string;
  listEmployeeNotAccount: any;
  checkUserNameValue: any;
  userNameExist: string;
  selectValue = null;
  selectedEmployee: any = [];
  hasEmployee: any = false;
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
    private employeeService: EmployeeService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    if (this.isAdd) {
      this.initFormValidate();
    } else {
      this.initFormValidateEdit();
    }
    this.getEmployeeNotAccount();
    this.getRoles();
  }

  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      _ipText_userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      _selectBox_Employee: ['', Validators.required],
      _selectBox_Role: ['', [Validators.required]],
    });
  }
  private initFormValidateEdit(): void {
    this.validateForm = this.fb.group({
      _ipText_userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      _selectBox_Employee: [''],
      _selectBox_Role: [''],
    });
  }

  private getEmployeeNotAccount(): any {
    this.employeeService.getEmployeeNotAccount().subscribe(response => {
      if (response && response.Status && response.Data) {
        this.listEmployeeNotAccount = response.Data;
        this.hasEmployeeNotAccount = true;
        console.log(this.listEmployeeNotAccount);
      }
    });
  }


  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.userService.getByUsername(control.value).subscribe(response => {
          if (response.Status && response.Data) {
            this.selectedEmployee = response.Data;
            // tslint:disable-next-line: triple-equals
            if (this.selectedEmployee.Id != this.userDto.Id) {
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
  private getRoles(): any {
    this.roleService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.listRole = JSON.parse(JSON.stringify(response.Data));
        this.modelRoleModal = JSON.parse(JSON.stringify(response.Data.map(p => {
          return { name: p.Name, id: p.Id };
        })));
      }
    });
  }

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

  resetForm(): void {
    this.validateForm.reset();
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  private saveData() {
    this.isConfirmLoading = true;
    if (!this.userDto || this.isAdd) {
      this.insertUser();

    } else {
      this.updateUser();
    }
  }

  private insertUser(): void {
    if (this.userDto) {
      this.userDto.Status = 'Active';
      this.userService.createEmployeeAccount(this.userDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Thêm tài khoản thành công');
        } else {
          this.message.create(TypeMessage.Error, 'Thêm tài khoản thất bại!');
        }
        this.isConfirmLoading = false;
      });
      this.resetForm();
    }

  }
  private updateUser() {
    if (this.userDto) {
      this.userService.updateEmployeeAccount(this.userDto).subscribe(response => {
          if (response && response.Status) {
            this.message.create(TypeMessage.Success, 'Cập nhật tài khoản người dùng thành công');
          } else {
            this.message.create(TypeMessage.Error, 'Cập nhật tài khoản người dùng không thành công!');
          }
          this.isConfirmLoading = false;
        });
    }
  }

}


