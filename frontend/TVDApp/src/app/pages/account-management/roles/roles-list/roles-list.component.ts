import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RoleService } from 'src/app/shared/services/role.service';
import { Router } from '@angular/router';
import { RolesDialogComponent } from '../roles-dialog/roles-dialog.component';
import { RoleDTO } from 'src/app/models/RoleDTO';
import { TypeMessage } from 'src/app/app.constant';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {


  dataSource: any = [];
  isConfirmLoading = false;
  pageTille = 'Danh sách vai trò';

  constructor(
    public roleService: RoleService,
    public router: Router,
    private message: NzMessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.isConfirmLoading = true;
    this.loadRoleList();
  }

  // get danh sach

  public loadRoleList(): any {
    this.roleService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.dataSource = response.Data;
        this.isConfirmLoading = false;
      }
    });
  }

  createRoles(): void {
    const modalCreate = this.modalService.create({
      nzTitle: 'Thêm vai trò',
      nzContent: RolesDialogComponent,
      nzComponentParams: {
        isAdd: true,
        roleDto: new RoleDTO()
      },
      nzWidth: '800',
    });
    modalCreate.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  editRoles(data: any) {
    const modalEdit = this.modalService.create({
      nzTitle: 'Chỉnh sửa vai trò',
      nzContent: RolesDialogComponent,
      nzComponentParams: {
        roleDto: JSON.parse(JSON.stringify(data))
      },
      nzWidth: '800'
    });

    modalEdit.afterClose.subscribe(() => {
      return this.ngOnInit();
    });
  }

  public confirmDelete(data: any) {
    const modalDelete = this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn xóa vai trò có tên là:',
      nzContent: `<b style='color: red;'> ${data.Name}?</b>`,
      nzOkText: 'Đồng ý',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteRole(data.Id),
      nzCancelText: 'Hủy',
    });
  }

  // delete
  private deleteRole(roleId: any) {
    const param: any = { roleId: roleId };
    this.roleService.delete(param).subscribe(response => {
      if (response.Status === true) {
        this.message.create(TypeMessage.Success, 'Xóa vai trò thành công!');
        this.loadRoleList();
      } else {
        this.message.create(TypeMessage.Error, 'Xóa vai trò không thành công!');
      }

    });

  }

}
