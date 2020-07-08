import { Component, OnInit, Input } from '@angular/core';
import { RoleDTO } from 'src/app/models/RoleDTO';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { observable, Observable, Observer } from 'rxjs';
import { RoleService } from 'src/app/shared/services/role.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { TypeMessage } from 'src/app/app.constant';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {

  isConfirmLoading = false;
  validateForm: FormGroup;
  selectedRole: any = [];
  isSaveLoading = false;
  @Input() isAdd: boolean;
  @Input() roleDto: RoleDTO;
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private message: NzMessageService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initFormValidate();
  }

  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      _ipText_roleName: ['', [Validators.required], [this.roleNameAsyncValidator]],
      _ipText_roleDescription: [''],
    });
  }

  roleNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        this.roleService.getByRoleName(control.value).subscribe(response => {
          if (response.Status && response.Data) {
            this.selectedRole = response.Data;
            // tslint:disable-next-line: triple-equals
            if (this.selectedRole.Id != this.roleDto.Id) {
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

  // check them hoac chinh sua
  private saveData() {
    this.isConfirmLoading = true;
    if (!this.roleDto || this.isAdd) {
      this.insertRole();
    } else {
      this.updateRole();
    }

  }

  // insert
  private insertRole(): void {
    if (this.roleDto) {
      this.roleService.create(this.roleDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Thêm vai trò thành công!');
        } else {
          this.message.create(TypeMessage.Error, 'Thêm vai trò không thành công!');
        }
        this.isConfirmLoading = false;
        this.resetForm();
      })
    }
  }

  // edit

  private updateRole() {
    if (this.roleDto) {
      this.roleService.update(this.roleDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Cập nhật vai trò thành công!');
        } else {
          this.message.create(TypeMessage.Error, 'Cập nhật vai trò không thành công!');
        }
        this.isConfirmLoading = false;
      });
    }
  }

  resetForm(): void {
    this.validateForm.reset();
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
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
}
