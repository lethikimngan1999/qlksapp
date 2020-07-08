import { Component, OnInit, Input } from '@angular/core';
import { RolePermissionDTO } from 'src/app/models/RolePermissionDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { NzMessageService, NzModalService, NzModalRef, valueFunctionProp } from 'ng-zorro-antd';
import { TypeMessage } from 'src/app/app.constant';

@Component({
  selector: 'app-permissions-dialog',
  templateUrl: './permissions-dialog.component.html',
  styleUrls: ['./permissions-dialog.component.css']
})
export class PermissionsDialogComponent implements OnInit {

  listMenus: any;
  listRoles: any;
  listRoleMenu: RolePermissionDTO[] = [];
  listPermissonOld: RolePermissionDTO[] = [];

  validateForm: FormGroup;
  isSaveLoading = false;
  isVisible = false;
  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private roleService: RoleService,
    private permissonService: PermissionService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initFormValidate();
    this.getRoles();
    this.getMenus();
    this.getPermission();
  }

  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      _selectBox_Roles: ['', [Validators.required]],
      _selectBox_Menus: ['', Validators.required]
    });
  }

  private getRoles(): any {
    this.roleService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.listRoles = response.Data;
      }
    });
  }

  private getMenus(): any {
    this.menuService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.listMenus = response.Data;
      }
    });
  }

  private getPermission(): any {
    this.permissonService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.listPermissonOld = JSON.parse(JSON.stringify(response.Data));
        console.log(this.listPermissonOld);
      }
    });
  }

  public deleteItem(roleId: string, menuId: string): void {
    this.modalService.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn có muốn xóa dòng này?',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        // delete item
        this.listRoleMenu = this.listRoleMenu.filter(p => p.RoleId !== roleId || p.MenuId !== menuId);
      },
      nzOnCancel: () => {
        console.log('not ok');
        return;
      }
    });
  }

  public addRoleMenu(value: any): void {
    const permissions = this.listPermissonOld.find(p => p.RoleId === value._selectBox_Roles && p.MenuId === value._selectBox_Menus);
    const permissions_temp = this.listRoleMenu.find(p => p.RoleId === value._selectBox_Roles && p.MenuId === value._selectBox_Menus);
    if (permissions) {
      this.message.create(TypeMessage.Error, 'Vai trò đã được thiết lập truy cập cho Menu này!');
      return;
    }
    if (permissions_temp) {
      this.message.create(TypeMessage.Error, 'Bạn đã chọn vai trò và menu này');
      return;
    }

    const roles = this.listRoles.find((p: { Id: any; }) => p.Id === value._selectBox_Roles);
    const menus = this.listMenus.find((p: { MenuId: any; }) => p.MenuId === value._selectBox_Menus);

    this.listRoleMenu = [
      ...this.listRoleMenu,
      {
        RoleId: roles.Id,
        RoleName: roles.Name,
        MenuId: menus.MenuId,
        MenuName: menus.MenuName,
        CanRead: false,
        CanCreate: false,
        CanUpdate: false,
        CanDelete: false,
        CanImport: false,
        CanExport: false,
        Status: 'Active'
      }
    ];
  }

  handleOk(): void {
    this.isSaveLoading = true;
    this.insertPermission();
    setTimeout(() => {
      this.isSaveLoading = false;
    }, 0);
    this.modal.destroy();
  }

  handlCancel(): void {
    this.resetForm();
    this.modal.destroy();
  }

  private insertPermission(): void {
    if (this.listRoleMenu) {
      this.permissonService.insertPermission(this.listRoleMenu).subscribe(response => {
        if (response && response.Status) {
          this.listRoleMenu = [];
          this.message.create(TypeMessage.Success, 'Thêm các quyền truy cập thành công!');
          this.getPermission();
        } else {
          this.message.create(TypeMessage.Error, 'Thêm các quyền truy cập không thành công!');
        }
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
