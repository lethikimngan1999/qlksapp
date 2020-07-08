import { Component, OnInit, Input } from '@angular/core';
import { RoleDTO } from 'src/app/models/RoleDTO';
import { UserDTO } from 'src/app/models/UserDTO';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { RoleService } from 'src/app/shared/services/role.service';
import { TypeMessage } from 'src/app/app.constant';

@Component({
  selector: 'app-user-role-dialog',
  templateUrl: './user-role-dialog.component.html',
  styleUrls: ['./user-role-dialog.component.css']
})
export class UserRoleDialogComponent implements OnInit {


  @Input() isShowAddRole: boolean;
  @Input() listRoles: any;
  @Input() userDto: any;
  @Input() roleIds: any;

  listRole: RoleDTO[] = [];
  modelRoleModal: any = [];
  userRole: any = [] ;
  listUser: UserDTO[] = [];

  validateForm: any;
  lisRolesOfUser: RoleDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private modal: NzModalRef,
    private message: NzMessageService,
  ) {
    this.validateForm = this.fb.group({
      _selectBox_role: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    this.getRoles();
  }

  private getRoles(): any {
    this.roleService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.listRole = JSON.parse(JSON.stringify(response.Data));
        this.modelRoleModal = JSON.parse(JSON.stringify(response.Data.map(p => {
          return {name: p.Name, id: p.Id};
        })));
      }
    });
  }

  public addRole() {
    const userRole: any[] = [];
    this.roleIds.forEach((item: any) => {
      userRole.push({ userId: this.userDto.Id, roleId: item });
    });
    this.roleService.createRoleUser(userRole).subscribe(response => {
      if (response.Status === true) {
        this.message.create(TypeMessage.Success, 'Thêm vai trò cho tài khoản thành công!');
        this.listUser.find(p => p.Id === this.userDto.Id).ListRoles = this.listRoles;
      } else {
        this.message.create(TypeMessage.Error, 'Thêm vai trò cho tài khoản không thành công!');
      }
    });
    this.modal.destroy();
  }
}
