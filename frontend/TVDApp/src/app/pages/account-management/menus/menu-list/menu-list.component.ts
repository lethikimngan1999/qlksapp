import { Component, OnInit } from '@angular/core';
import { MenuDTO } from 'src/app/models/MenuDTO';
import * as CONFIG from '../../../../app.config';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RoleService } from 'src/app/shared/services/role.service';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  initLoading = true;
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  pageTitle: string = "Danh sách MenuSidebar hệ thống";
  isConfirmLoading = false;
  listMenu: MenuDTO[] = [];
  // listOfMapData = CONFIG.MENUS_SIDEBAR;
  constructor(
    private apiService: MenuService,
    private roleService: RoleService,
    private permissionService: Permissions
  ) { }

  ngOnInit(): void {
    this.getListMenus();
  }

  private getListMenus(): any {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.apiService.getAll().subscribe(response => {
        if (response && response.Status) {
          this.listMenu = JSON.parse(JSON.stringify(response.Data));
          console.log(this.listMenu);
        }

      });

    }, 1000);
    this.isConfirmLoading = false;
    this.initLoading = false;
  }
}
