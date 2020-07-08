import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { Router } from '@angular/router';
import { RolePermissionDTO } from 'src/app/models/RolePermissionDTO';
import { RoleService } from 'src/app/shared/services/role.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { PermissionsDialogComponent } from '../permissions-dialog/permissions-dialog.component';
import { TypeMessage } from 'src/app/app.constant';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit {

  pageTille = 'Quyền truy cập';
  dataSource: any = [];
  isConfirmLoading = false;
  pageTiTle = 'Danh sách quyền truy cập';

  validateForm: FormGroup;
  listRoles: any;
  listMenus: any;
  listPermissionOld: RolePermissionDTO[] = [];

  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private menuService: MenuService,
    public router: Router,
    private fb: FormBuilder,
    public modalService: NzModalService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      role: ['', [Validators.required]],
      menu: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.getMenus();
    this.getPermission();
  }

  // get danh sach
  private getPermission(): any {
      this.permissionService.getAll().subscribe(response => {
        if (response && response.Status) {
          this.listPermissionOld = JSON.parse(JSON.stringify(response.Data));
        }
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

  createPermission(): void {
    const modalCreate = this.modalService.create({
      nzTitle: 'Thêm quyền truy cập',
      nzContent: PermissionsDialogComponent,
      nzComponentParams: {
      },
      nzWidth: '1080',
    });
    modalCreate.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  // edit

  public updatePermission(data: any) {
    if (data) {
      this.permissionService.updatePermission(data).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Cập nhật quyền truy cập thành công!');
          this.getPermission();
        } else {
          this.message.create(TypeMessage.Error, 'Cập nhật quyền truy cập không thành công!');
        }
      });
    }
  }

  public deletePermission(roleId: any, menuId: any) {
    this.modalService.confirm({
      nzTitle: 'Xác nhận',
      nzContent: 'Bạn chắc chắn xóa quyền truy cập này?',
      nzOkText: 'Đồng ý',
      nzCancelText: 'Hủy',
      nzOnOk: () => {
        if (roleId && menuId) {
          const permission = { menuId, roleId };
          this.permissionService.deletePermission(permission).subscribe(response => {
            if (response && response.Status) {
              this.message.create(TypeMessage.Success, 'Xóa quyền truy cập thành công!');
              // reload data
              this.listPermissionOld = this.listPermissionOld.filter(p => p.RoleId !== roleId || p.MenuId !== menuId);
            } else {
              this.message.create(TypeMessage.Success, 'Xóa quyền truy cập không thành công!');
            }

          });
        }
      },
      nzOnCancel: () => {
        return;
      }

    });
  }

}
